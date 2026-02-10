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
    rotatePage,
    downloadPDF,
  } = usePDFViewer();

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      {/* 上传区域（无文件时显示） */}
      {!file && <UploadArea onFileUpload={handleFileUpload} />}

      {/* PDF 查看器（有文件时显示） */}
      {file && (
        <>
          {/* 左侧缩略图面板 */}
          <ThumbnailPanel
            file={file}
            numPages={numPages}
            currentPage={currentPage}
            onPageClick={goToPage}
          />

          {/* 右侧主内容区 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* PDF 画布 */}
            <PDFCanvas
              file={file}
              currentPage={currentPage}
              scale={scale}
              rotation={rotation}
              onDocumentLoadSuccess={onDocumentLoadSuccess}
            />

            {/* 底部工具栏 */}
            <Toolbar
              currentPage={currentPage}
              numPages={numPages}
              scale={scale}
              onFirstPage={goToFirstPage}
              onPrevPage={goToPrevPage}
              onNextPage={goToNextPage}
              onLastPage={goToLastPage}
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              onResetZoom={resetZoom}
              onRotate={rotatePage}
              onDownload={downloadPDF}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PDFViewer;
