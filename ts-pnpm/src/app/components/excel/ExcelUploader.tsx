'use client'
import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import FileDropzone from './FileDropzone';
import PreviewTable from './PreviewTable';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

const ExcelUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [previewData, setPreviewData] = useState<any[] | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setUploadStatus('idle');
    setErrorMessage('');
    setPreviewData(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploadStatus('uploading');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/api/excel-upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setPreviewData(data.data);
      setUploadStatus('success');
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <FileDropzone 
        onFileSelect={handleFileSelect}
        currentFile={file}
      />

      {file && (
        <div className="flex items-center space-x-4">
          <FileText className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600">{file.name}</span>
          <Button
            onClick={handleUpload}
            disabled={uploadStatus === 'uploading'}
            className="ml-auto"
          >
            {uploadStatus === 'uploading' ? (
              <>
                <Upload className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </>
            )}
          </Button>
        </div>
      )}

      {uploadStatus === 'success' && (
        <Alert variant="default" className="bg-green-50 border-green-200">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <AlertDescription>
            File uploaded successfully!
          </AlertDescription>
        </Alert>
      )}

      {uploadStatus === 'error' && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>
            {errorMessage || 'An error occurred during upload'}
          </AlertDescription>
        </Alert>
      )}

      {previewData && (
        <PreviewTable data={previewData} />
      )}
    </Card>
  );
};

export default ExcelUploader;