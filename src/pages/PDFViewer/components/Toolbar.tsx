import { Button, Space, Slider, Select } from "antd";
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  FullscreenOutlined,
  ExpandOutlined,
  CompressOutlined,
  ColumnWidthOutlined,
  VerticalAlignMiddleOutlined,
  EyeOutlined,
  BorderOutlined,
  SplitCellsOutlined,
  RotateRightOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

interface ToolbarProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onRotate: () => void;
  onDownload: () => void;
  onScaleChange: (value: number) => void;
  // 新增功能属性
  onFitWidth?: () => void;
  onFitHeight?: () => void;
  onFitPage?: () => void;
  onFullscreen?: () => void;
  // 视图模式属性
  viewMode: "single" | "double" | "scroll";
  onToggleViewMode: (mode: "single" | "double" | "scroll") => void;
  sidebarVisible: boolean;
  onToggleSidebar: () => void;
}

export const Toolbar = ({
  scale,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onRotate,
  onScaleChange,
  onFitWidth,
  onFitHeight,
  onFitPage,
  onFullscreen,
  viewMode,
  onToggleViewMode,
  sidebarVisible,
  onToggleSidebar,
}: ToolbarProps) => {
  return (
    <div
      style={{
        background: "#eeeeee",
        borderTop: "1px solid #d0d0d0",
        padding: "4px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "40px",
        userSelect: "none",
        gap: "20px",
      }}
    >
      {/* 中间：视图工具栏 (复刻图1样式) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1px",
          background: "#ddd",
          padding: "2px",
          borderRadius: "4px",
        }}
      >
        {/*  */}
        <Space
          size={1}
          split={
            <div
              style={{
                width: "1px",
                height: "14px",
                background: "#bbb",
                margin: "0 2px",
              }}
            />
          }
        >
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            title={sidebarVisible ? "隐藏侧边栏" : "显示侧边栏"}
            onClick={onToggleSidebar}
            style={{ background: sidebarVisible ? "#ccc" : "transparent" }}
          />
          <Button
            type="text"
            size="small"
            icon={<UnorderedListOutlined />}
            title="滚动视图"
            onClick={() => onToggleViewMode("scroll")}
            style={{ background: viewMode === "scroll" ? "#ccc" : "transparent" }}
          />
          <Button
            type="text"
            size="small"
            icon={<SplitCellsOutlined />}
            title="双页视图"
            onClick={() => onToggleViewMode("double")}
            style={{ background: viewMode === "double" ? "#ccc" : "transparent" }}
          />
          <Button
            type="text"
            size="small"
            icon={<BorderOutlined />}
            title="单页视图"
            onClick={() => onToggleViewMode("single")}
            style={{ background: viewMode === "single" ? "#ccc" : "transparent" }}
          />
          <Button
            type="text"
            size="small"
            icon={<VerticalAlignMiddleOutlined />}
            onClick={onFitHeight}
            title="适应高度"
          />
          <Button
            type="text"
            size="small"
            icon={<ColumnWidthOutlined />}
            onClick={onFitWidth}
            title="适应宽度"
          />
          <Button
            type="text"
            size="small"
            icon={<ExpandOutlined />}
            onClick={onFitPage}
            title="适应页面"
          />
          <Button
            type="text"
            size="small"
            icon={<CompressOutlined />}
            onClick={onResetZoom}
            title="重置视图"
          />
          <Button
            type="text"
            size="small"
            icon={<RotateRightOutlined />}
            onClick={onRotate}
            title="旋转"
          />
        </Space>
      </div>

      {/* 右侧：缩放控制 (带 Slider) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "300px",
        }}
      >
        <Select
          size="small"
          variant="borderless"
          value={Math.round(scale * 100) + "%"}
          style={{ width: "80px", fontSize: "12px" }}
          options={[
            { value: "50%", label: "50%" },
            { value: "75%", label: "75%" },
            { value: "100%", label: "100%" },
            { value: "125%", label: "125%" },
            { value: "150%", label: "150%" },
            { value: "200%", label: "200%" },
          ]}
          onChange={(v: string) => onScaleChange(parseFloat(v) / 100)}
        />
        <Button
          type="text"
          size="small"
          icon={<ZoomOutOutlined />}
          onClick={onZoomOut}
        />
        <Slider
          min={30}
          max={300}
          value={Math.round(scale * 100)}
          onChange={(v) => onScaleChange(v / 100)}
          style={{ flex: 1, margin: "0 8px" }}
          tooltip={{ open: false }}
        />
        <Button
          type="text"
          size="small"
          icon={<ZoomInOutlined />}
          onClick={onZoomIn}
        />
        <Button
          type="text"
          size="small"
          icon={<FullscreenOutlined />}
          onClick={onFullscreen}
          title="全屏"
        />
      </div>
    </div>
  );
};
