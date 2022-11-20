import Container from "@/app/components/Container";
import { MdUploadFile } from "react-icons/md";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { surfClient } from "@/lib/surfClient";

const props: UploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      void message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      void message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function Sidebar() {
  return (
    <div className="w-[20rem]">
      <Container>
        <div className="flex flex-col gap-1">
          <button className="p-2 px-3 bg-white bg-opacity-0 rounded-xl hover:bg-opacity-20 duration-700 items-center">
            <MdUploadFile />
            Upload File
          </button>
          <button className="p-2 px-3 bg-white bg-opacity-0 rounded-xl hover:bg-opacity-20 duration-700">
            Upload Folder
          </button>
          <button className="p-2 px-3 bg-white bg-opacity-0 rounded-xl hover:bg-opacity-20 duration-700">
            New Folder
          </button>
          <Upload {...props}>
            <Button icon={<MdUploadFile />} >Click to Upload</Button>
          </Upload>
        </div>
      </Container>
    </div>
  );
}
