import { Document, Page } from "react-pdf";
import { Spin } from "antd";

interface ThumbnailPanelProps {
  file: File | null;
  numPages: number;
  currentPage: number;
  onPageClick: (page: number) => void;
}

export const ThumbnailPanel = ({
  file,
  numPages,
  currentPage,
  onPageClick,
}: ThumbnailPanelProps) => {
  if (!file || numPages === 0) {
    return null;
  }

  return (
    <div
      style={{
        width: "200px",
        minWidth: "200px",
        background: "white",
        borderRight: "1px solid #e0e0e0",
        overflowY: "auto",
        padding: "16px",
      }}
    >
      <div
        style={{
          fontSize: "16px",
          fontWeight: 500,
          marginBottom: "16px",
          color: "#333",
        }}
      >
        缩略图
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Document file={file} loading={null}>
          {Array.from({ length: numPages }, (_, index) => (
            <div
              key={index + 1}
              onClick={() => onPageClick(index + 1)}
              style={{
                cursor: "pointer",
                border:
                  currentPage === index + 1
                    ? "2px solid #ff4d4f"
                    : "2px solid #e0e0e0",
                borderRadius: "4px",
                overflow: "hidden",
                transition: "all 0.2s",
                background: "white",
                marginBottom: "4px",
                boxShadow:
                  currentPage === index + 1
                    ? "0 2px 8px rgba(255, 77, 79, 0.3)"
                    : "none",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== index + 1) {
                  e.currentTarget.style.borderColor = "#1890ff";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(24, 144, 255, 0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== index + 1) {
                  e.currentTarget.style.borderColor = "#e0e0e0";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              <Page
                pageNumber={index + 1}
                width={168}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                loading={
                  <div style={{ padding: "20px", textAlign: "center" }}>
                    <Spin size="small" />
                  </div>
                }
              />
              <div
                style={{
                  textAlign: "center",
                  padding: "8px",
                  background: "#fafafa",
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                第{index + 1}页
              </div>
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
};
