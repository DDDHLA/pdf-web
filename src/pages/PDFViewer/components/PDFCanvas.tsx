import { Document, Page } from "react-pdf";
import { Spin } from "antd";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

interface PDFCanvasProps {
  file: File | null;
  currentPage: number;
  scale: number;
  rotation: number;
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
}

export const PDFCanvas = ({
  file,
  currentPage,
  scale,
  rotation,
  onDocumentLoadSuccess,
}: PDFCanvasProps) => {
  if (!file) {
    return null;
  }

  return (
    <div
      style={{
        flex: 1,
        overflow: "auto",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "#e8e8e8",
      }}
    >
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<Spin size="large" tip="加载PDF中..." />}
      >
        <div
          style={{
            background: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <Page
            pageNumber={currentPage}
            scale={scale}
            rotate={rotation}
            loading={<Spin tip="渲染中..." />}
          />
        </div>
      </Document>
    </div>
  );
};
