import { Document, Page } from "react-pdf";
import { Spin, Button } from "antd";
import {
  StepBackwardOutlined,
  LeftOutlined,
  RightOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";

interface ThumbnailPanelProps {
  file: File | null;
  numPages: number;
  currentPage: number;
  onPageClick: (page: number) => void;
  // 新增分页导航属性
  onFirstPage: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
}

export const ThumbnailPanel = ({
  file,
  numPages,
  currentPage,
  onPageClick,
  onFirstPage,
  onPrevPage,
  onNextPage,
  onLastPage,
}: ThumbnailPanelProps) => {
  if (!file || numPages === 0) {
    return null;
  }

  return (
    <div
      style={{
        width: "250px", // 稍微加宽一点以容纳分页器
        minWidth: "250px",
        background: "white",
        borderRight: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        height: "100%", // 占满高度
      }}
    >
      {/* 顶部标题 */}
      <div
        style={{
          height: "48px",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
          fontSize: "16px",
          fontWeight: 500,
          color: "#333",
          flexShrink: 0,
        }}
      >
        缩略图
      </div>

      {/* 中间缩略图列表 (可滚动) */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
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
                width={200} // 适配新的宽度
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

      {/* 底部：分页导航 (固定在底部) */}
      <div
        style={{
          height: "40px",
          padding: "0 12px",
          borderTop: "1px solid #e0e0e0",
          background: "#fafafa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          flexShrink: 0,
        }}
      >
        <Button
          type="text"
          size="small"
          icon={<StepBackwardOutlined style={{ fontSize: "12px", color: "#666" }} />}
          disabled={currentPage === 1}
          onClick={onFirstPage}
        />
        <Button
          type="text"
          size="small"
          icon={<LeftOutlined style={{ fontSize: "12px", color: "#666" }} />}
          disabled={currentPage === 1}
          onClick={onPrevPage}
        />
        <div
          style={{
            margin: "0 4px",
            padding: "2px 10px",
            background: "white",
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
            fontSize: "12px",
            minWidth: "50px",
            textAlign: "center",
          }}
        >
          {currentPage} / {numPages}
        </div>
        <Button
          type="text"
          size="small"
          icon={<RightOutlined style={{ fontSize: "12px", color: "#666" }} />}
          disabled={currentPage === numPages}
          onClick={onNextPage}
        />
        <Button
          type="text"
          size="small"
          icon={<StepForwardOutlined style={{ fontSize: "12px", color: "#666" }} />}
          disabled={currentPage === numPages}
          onClick={onLastPage}
        />
      </div>
    </div>
  );
};
