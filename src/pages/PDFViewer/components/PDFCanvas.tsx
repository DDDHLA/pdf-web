import { Document, Page } from "react-pdf";
import { Spin } from "antd";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

interface PDFCanvasProps {
  file: File | null;
  numPages: number;
  currentPage: number;
  scale: number;
  rotation: number;
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
  onPageLoadSuccess: (page: { width: number; height: number }) => void;
  viewMode: 'single' | 'double' | 'scroll';
}

export const PDFCanvas = ({
  file,
  numPages,
  currentPage,
  scale,
  rotation,
  onDocumentLoadSuccess,
  onPageLoadSuccess,
  viewMode,
}: PDFCanvasProps) => {
  if (!file) {
    return null;
  }

  return (
    <div
      style={{
        flex: 1,
        overflow: "auto",
        display: "flex",
        background: "#e8e8e8",
        position: "relative",
      }}
    >
      <div
        style={{
          margin: "auto", // 核心修复：自动居中，且防止左侧溢出被裁
          padding: "40px",
          minWidth: "min-content",
          minHeight: "min-content",
        }}
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<Spin size="large" tip="加载PDF中..." />}
        >
          <div
            style={{
              display: "flex",
              flexDirection: viewMode === "scroll" ? "column" : "row",
              gap: "20px",
              alignItems: "center",
            }}
          >
            {viewMode === "scroll" ? (
              /* 滚动模式：渲染所有页面 */
              Array.from({ length: numPages }, (_, index) => (
                <div
                  key={index + 1}
                  style={{
                    background: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    marginBottom: index === numPages - 1 ? 0 : "20px",
                  }}
                >
                  <Page
                    pageNumber={index + 1}
                    scale={scale}
                    rotate={rotation}
                    loading={<Spin tip={`渲染第 ${index + 1} 页...`} />}
                    onLoadSuccess={
                      index === 0
                        ? (page) => {
                            onPageLoadSuccess({
                              width: page.originalWidth,
                              height: page.originalHeight,
                            });
                          }
                        : undefined
                    }
                  />
                </div>
              ))
            ) : (
              /* 翻页模式：渲染 1 或 2 页 */
              <>
                {/* 第一页 (当前页) */}
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
                    onLoadSuccess={(page) => {
                      onPageLoadSuccess({
                        width: page.originalWidth,
                        height: page.originalHeight,
                      });
                    }}
                  />
                </div>

                {/* 第二页 (如果是双页模式且不是最后一页) */}
                {viewMode === "double" && currentPage < numPages && (
                  <div
                    style={{
                      background: "white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    <Page
                      pageNumber={currentPage + 1}
                      scale={scale}
                      rotate={rotation}
                      loading={<Spin tip="渲染中..." />}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </Document>
      </div>
    </div>
  );
};
