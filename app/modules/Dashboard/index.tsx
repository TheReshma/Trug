import { useGlobal } from "@/app/context/GlobalContext";
import { getAllFiles } from "@/app/services/File";
import { useState, useEffect, Key } from "react";
import { FileType } from "@/app/types/types";
import Container from "@/app/components/Container";

export default function Dashboard() {
  const { userData, ethAddress } = useGlobal();
  const [files, setFiles] = useState<FileType[]>([]);

  useEffect(() => {
    const data = async () => {
      const res = await getAllFiles(ethAddress);
      console.log(res);
      setFiles(res);
    };
    void data();
  }, []);

  return (
    <div className="flex flex-row flex-wrap gap-3">
      {files.map((file) => {
        return (
          <div
            key={file.streamId}
            onClick={() => {
              window.open(`https://${file.cId}.ipfs.w3s.link/${file.filename}`);
            }}
            className="rounded-xl bg-white bg-opacity-10 border-white cursor-pointer p-3 hover:bg-opacity-20 duration-700"
          >
            <img
              src={`https://${file.cId}.ipfs.w3s.link/${file.filename}`}
              className="h-16"
            />
            <p className="mt-2 text-lg font-bold">{file.filename}</p>
            <p className="text-zinc-600 text-sm">{file.filetype}</p>
          </div>
        );
      })}
    </div>
  );
}
