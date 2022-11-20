import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFile } from "@/app/services/File";

const props: UploadProps = {
  customRequest: (info) => {
    void uploadFile({ info });
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "uploading") {
      void message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      void message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function Sidebar() {
  return (
    <div className="w-[20rem]">
      <div className="flex flex-col gap-1">
        <Upload {...props}>
          <button className="flex flex-row justify between p-3 bg-white bg-opacity-10 font-bold hover:bg-opacity-20 rounded-2xl duration-700 text-white items-center px-16 gap-3">
            <UploadOutlined />
            Click to Upload
          </button>
        </Upload>
      </div>
    </div>
  );
}
