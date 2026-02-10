import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import PDFViewer from '@/pages/PDFViewer';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/pdf-viewer" replace />,
      },
      {
        path: 'pdf-viewer',
        element: <PDFViewer />,
      },
    ],
  },
]);
