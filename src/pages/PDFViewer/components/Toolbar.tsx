import { Button, Space } from "antd";
import {
  StepBackwardOutlined,
  LeftOutlined,
  RightOutlined,
  StepForwardOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  ReloadOutlined,
  RotateRightOutlined,
  DownloadOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

interface ToolbarProps {
  currentPage: number;
  numPages: number;
  scale: number;
  onFirstPage: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onRotate: () => void;
  onDownload: () => void;
}

export const Toolbar = ({
  currentPage,
  numPages,
  scale,
  onFirstPage,
  onPrevPage,
  onNextPage,
  onLastPage,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onRotate,
  onDownload,
}: ToolbarProps) => {
  return (
    <div
      style={{
        background: "white",
        borderTop: "1px solid #e0e0e0",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* 左侧：页面导航 */}
      <Space>
        <Button
          icon={<StepBackwardOutlined />}
          disabled={currentPage === 1}
          onClick={onFirstPage}
          title="首页"
        />
        <Button
          icon={<LeftOutlined />}
          disabled={currentPage === 1}
          onClick={onPrevPage}
          title="上一页"
        />
        <div
          style={{
            minWidth: "100px",
            textAlign: "center",
            padding: "4px 12px",
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
            background: "white",
            fontSize: "14px",
          }}
        >
          {currentPage} / {numPages}
        </div>
        <Button
          icon={<RightOutlined />}
          disabled={currentPage === numPages}
          onClick={onNextPage}
          title="下一页"
        />
        <Button
          icon={<StepForwardOutlined />}
          disabled={currentPage === numPages}
          onClick={onLastPage}
          title="末页"
        />
      </Space>

      {/* 中间：其他工具 */}
      <Space>
        <Button icon={<RotateRightOutlined />} onClick={onRotate} title="旋转">
          旋转
        </Button>
        <Button icon={<DownloadOutlined />} onClick={onDownload} title="下载">
          下载
        </Button>
        <Button
          icon={<PrinterOutlined />}
          onClick={() => window.print()}
          title="打印"
        >
          打印
        </Button>
      </Space>

      {/* 右侧：缩放控制 */}
      <Space>
        <Button icon={<ZoomOutOutlined />} onClick={onZoomOut} title="缩小" />
        <div
          style={{
            minWidth: "60px",
            textAlign: "center",
            padding: "4px 12px",
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
            background: "#fafafa",
            fontSize: "14px",
          }}
        >
          {Math.round(scale * 100)}%
        </div>
        <Button icon={<ZoomInOutlined />} onClick={onZoomIn} title="放大" />
        <Button icon={<ReloadOutlined />} onClick={onResetZoom} title="重置" />
      </Space>
    </div>
  );
};
