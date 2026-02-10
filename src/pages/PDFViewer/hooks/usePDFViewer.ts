import { useState, useCallback } from 'react';

export const usePDFViewer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);

  // 文件上传处理
  const handleFileUpload = useCallback((uploadedFile: File) => {
    setFile(uploadedFile);
    setCurrentPage(1);
    setScale(1.0);
    setRotation(0);
  }, []);

  // 文档加载完成
  const onDocumentLoadSuccess = useCallback(({ numPages: pages }: { numPages: number }) => {
    setNumPages(pages);
    setCurrentPage(1);
  }, []);

  // 页面导航
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= numPages) {
      setCurrentPage(page);
    }
  }, [numPages]);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, numPages));
  }, [numPages]);

  const goToLastPage = useCallback(() => {
    setCurrentPage(numPages);
  }, [numPages]);

  // 缩放控制
  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - 0.2, 0.3));
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1.0);
  }, []);

  const setCustomScale = useCallback((newScale: number) => {
    setScale(newScale);
  }, []);

  // 旋转控制
  const rotatePage = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  // 下载 PDF
  const downloadPDF = useCallback(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [file]);

  return {
    // 状态
    file,
    numPages,
    currentPage,
    scale,
    rotation,
    // 文件处理
    handleFileUpload,
    onDocumentLoadSuccess,
    // 页面导航
    goToPage,
    goToFirstPage,
    goToPrevPage,
    goToNextPage,
    goToLastPage,
    // 缩放控制
    zoomIn,
    zoomOut,
    resetZoom,
    setCustomScale,
    // 旋转
    rotatePage,
    // 下载
    downloadPDF,
  };
};
