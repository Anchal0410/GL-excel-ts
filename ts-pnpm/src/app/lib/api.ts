// src/lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ;


export interface ApiResponse<T> {
  message: string;
  data?: T;
  error?: string;
}

export interface ExcelData {
  [key: string]: any;
}

export const api = {
  // Test hello endpoint
  hello: async (): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/hello`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch');
    }
  },

  // Upload Excel file
  uploadExcel: async (file: File): Promise<ApiResponse<ExcelData[]>> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/excel-upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to upload file');
    }
  }
};

// Helper function to handle API errors
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export default api;