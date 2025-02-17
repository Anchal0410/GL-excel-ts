# Excel Upload Project

A full-stack application for uploading and processing Excel files, built with Next.js, Express, and TypeScript.


## Frontend Setup (Next.js)

1. **Clone the template repository:**
```bash
git clone https://github.com/theodorusclarence/ts-nextjs-tailwind-starter.git ts-pnpm
cd ts-pnpm
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Create environment file:**
Create `.env.local` in the frontend root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

4. **Create required components:**
- Create the Excel upload page and components as per the project structure
- Ensure all components are properly imported and exported

5. **Run the development server:**
```bash
pnpm dev
```

Frontend will be running at http://localhost:3000

## Backend Setup (Express)

1. **Move to backend directory:**
```bash
cd excel-upload-backend
```

2. **Install Packages:**
```bash
npm install
```


7. **Run the development server:**
```bash
npm run dev
```

Backend will be running at http://localhost:3001



3. **Access the application:**
- Open your browser and navigate to http://localhost:3000/excel-upload
- Upload an Excel file and test the functionality

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your backend URL

### Backend (Render)

1. Push your code to GitHub
2. Create a new Web Service in Render
3. Configure:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment Variables:
     - `PORT`: 3001
     - `FRONTEND_URL`: Your Vercel frontend URL

## Features

- Excel file upload with drag-and-drop support
- File type validation (.xlsx, .xls)
- File size limit (5MB)
- Excel data processing
- Data preview in table format
- Responsive design
- TypeScript support
- Error handling

## Testing

1. Create a sample Excel file with some data
2. Try uploading through the interface
3. Check the backend console for logged data
4. Verify the data preview in the frontend

## Troubleshooting

### Frontend Issues
- Check browser console for errors
- Verify environment variables
- Clear browser cache
- Check Network tab for API calls

### Backend Issues
- Check server logs
- Verify file permissions
- Check CORS configuration
- Monitor API response times
