import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import cors from 'cors';
import ExcelJS from 'exceljs';

const app = express();
const port = 3001;

// Types
interface ExcelUploadResponse {
  message?: string;
  data?: any[];
  error?: string;
}

// Configure multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/hello', (_req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

const handleExcelUpload = async (req: Request, res: Response<ExcelUploadResponse>) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);

    const worksheet = workbook.getWorksheet(1);
    const data: any[] = [];
    const headers: string[] = [];

    // Get headers
    worksheet?.getRow(1).eachCell((cell, colNumber) => {
      headers[colNumber - 1] = cell.value?.toString() || `Column ${colNumber}`;
    }); 

    // Get data
    worksheet?.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row

      const rowData: any = {};
      row.eachCell((cell, colNumber) => {
        rowData[headers[colNumber - 1]] = cell.value;
      });

      console.log(`Row ${rowNumber}:`, rowData);
      data.push(rowData);
    });

    res.json({
      message: 'File processed successfully',
      data
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

app.post('/api/excel-upload', upload.single('file'), handleExcelUpload);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
