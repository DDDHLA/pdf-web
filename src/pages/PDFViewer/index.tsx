import React, { useState, useRef } from "react";
import { pdfjs } from "react-pdf";
import { usePDFViewer } from "./hooks/usePDFViewer";
import { UploadArea } from "./components/UploadArea";
import { ThumbnailPanel } from "./components/ThumbnailPanel";
import { PDFCanvas } from "./components/PDFCanvas";
import { Toolbar } from "./components/Toolbar";

// 配置 PDF.js Worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PDFViewer = () => {
  const {
    file,
    numPages,
    currentPage,
    scale,
    rotation,
    handleFileUpload,
    onDocumentLoadSuccess,
    goToPage,
    goToFirstPage,
    goToPrevPage,
    goToNextPage,
    goToLastPage,
    zoomIn,
    zoomOut,
    resetZoom,
    setCustomScale,
    fitWidth,
    fitHeight,
    fitPage,
    rotatePage,
    downloadPDF,
    viewMode,
    setViewMode,
    sidebarVisible,
    setSidebarVisible,
  } = usePDFViewer();

  // 状态：存储页面原始尺寸
  const [pageDimensions, setPageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // 引用：容器 DOM，用于计算可用空间及全屏
  const containerRef = useRef<HTMLDivElement>(null);

  // 处理函数：适应宽度
  const handleFitWidth = () => {
    if (containerRef.current && pageDimensions) {
      // 减去 padding (40px * 2 = 80px) 和 滚动条余量 (20px)
      const availableWidth = containerRef.current.clientWidth - 100;
      fitWidth(availableWidth, pageDimensions.width);
    }
  };

  // 处理函数：适应高度
  const handleFitHeight = () => {
    if (containerRef.current && pageDimensions) {
      // 减去 padding (40px * 2)
      const availableHeight = containerRef.current.clientHeight - 80;
      fitHeight(availableHeight, pageDimensions.height);
    }
  };

  // 处理函数：适应页面 (同时考虑宽和高)
  const handleFitPage = () => {
    if (containerRef.current && pageDimensions) {
      const availableWidth = containerRef.current.clientWidth - 100;
      const availableHeight = containerRef.current.clientHeight - 80;
      fitPage(
        availableWidth,
        availableHeight,
        pageDimensions.width,
        pageDimensions.height
      );
    }
  };

  // 处理函数：全屏切换
  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      {/* 上传区域（无文件时显示） */}
      {!file && <UploadArea onFileUpload={handleFileUpload} />}

      {/* PDF 查看器（有文件时显示） */}
      {file && (
        <>
          {/* 左侧缩略图面板 (受控显示) */}
          {sidebarVisible && (
            <ThumbnailPanel
              file={file}
              numPages={numPages}
              currentPage={currentPage}
              onPageClick={goToPage}
              onFirstPage={goToFirstPage}
              onPrevPage={goToPrevPage}
              onNextPage={goToNextPage}
              onLastPage={goToLastPage}
            />
          )}

          {/* 右侧主内容区 */}
          <div
            ref={containerRef} // 绑定 Ref
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              minWidth: 0,
              overflow: "hidden",
              position: "relative", // 为全屏做准备
              background: "#f5f5f5", // 全屏时需要背景色
            }}
          >
            {/* 顶部文件名 */}
            <div
              style={{
                height: "48px",
                padding: "0 24px",
                display: "flex",
                alignItems: "center",
                background: "white",
                borderBottom: "1px solid #e0e0e0",
                fontSize: "16px",
                fontWeight: 500,
                color: "#333",
                flexShrink: 0,
              }}
            >
              文件名称：<span style={{ color: "#ff4d4f" }}>{file.name}</span>
            </div>

            {/* PDF 画布 */}
            <PDFCanvas
              file={file}
              numPages={numPages}
              currentPage={currentPage}
              scale={scale}
              rotation={rotation}
              onDocumentLoadSuccess={onDocumentLoadSuccess}
              onPageLoadSuccess={setPageDimensions} // 获取页面尺寸
              viewMode={viewMode}
            />

            {/* 底部工具栏 */}
            <Toolbar
              scale={scale}
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              onResetZoom={resetZoom}
              onRotate={rotatePage}
              onDownload={downloadPDF}
              onScaleChange={setCustomScale}
              // 绑定新功能
              onFitWidth={handleFitWidth}
              onFitHeight={handleFitHeight}
              onFitPage={handleFitPage}
              onFullscreen={handleFullscreen}
              // 绑定视图模式
              viewMode={viewMode}
              onToggleViewMode={setViewMode}
              sidebarVisible={sidebarVisible}
              onToggleSidebar={() => setSidebarVisible(!sidebarVisible)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PDFViewer;