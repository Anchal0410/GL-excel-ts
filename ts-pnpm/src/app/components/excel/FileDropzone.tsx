import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  currentFile: File | null;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileSelect, currentFile }) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                   file.type === 'application/vnd.ms-excel')) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={cn(
        'border-2 border-dashed rounded-lg p-8',
        'flex flex-col items-center justify-center',
        'transition-colors duration-200',
        currentFile
          ? 'border-green-300 bg-green-50'
          : 'border-gray-300 hover:border-blue-400'
      )}
    >
      <Upload 
        className={cn(
          'w-12 h-12 mb-4',
          currentFile ? 'text-green-500' : 'text-gray-400'
        )}
      />
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">
          {currentFile
            ? 'File selected: ' + currentFile.name
            : 'Drag and drop your Excel file here, or'}
        </p>
        <label className="inline-block">
          <span className="cursor-pointer text-blue-500 hover:text-blue-600">
            browse to upload
          </span>
          <input
            type="file"
            className="hidden"
            accept=".xlsx,.xls"
            onChange={handleFileInput}
          />
        </label>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Supported formats: .xlsx, .xls
      </p>
    </div>
  );
};

export default FileDropzone;