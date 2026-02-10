import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

const { Dragger } = Upload;

interface UploadAreaProps {
  onFileUpload: (file: File) => void;
}

export const UploadArea = ({ onFileUpload }: UploadAreaProps) => {
  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    accept: ".pdf",
    beforeUpload: (file) => {
      if (file.type === "application/pdf") {
        onFileUpload(file);
      }
      return false; // 阻止自动上传
    },
    showUploadList: false,
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <Dragger
        {...uploadProps}
        style={{ width: "400px", padding: "60px 40px" }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
        </p>
        <p
          className="ant-upload-text"
          style={{ fontSize: "16px", fontWeight: 500 }}
        >
          点击或拖拽上传PDF文件
        </p>
        <p
          className="ant-upload-hint"
          style={{ fontSize: "14px", color: "#999" }}
        >
          支持PDF格式文件
        </p>
      </Dragger>
    </div>
  );
};
