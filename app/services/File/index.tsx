import { Web3Storage } from "web3.storage";

interface Props {
  info: any;
}

export const uploadFile = async ({ info }: Props) => {
  console.log(info);
  const token = process.env.WEB3_STORAGE_TOKEN as string;
  const web3storage = new Web3Storage({ token });
  const file = info.file as File;
  const cid = await web3storage.put([file]);
  console.log(cid);
  if (cid) {
    const res = await fetch(`api/files/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          cId: cid,
          filename: info.file.name,
          filetype: info.file.type,
        },
      }),
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      return true;
    } else {
      return false;
    }
  }
};

export const getAllFiles = async (ethAddress: string) => {
  const res = await fetch(`api/files?ethAddress=${ethAddress}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  console.log(ethAddress);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return false;
  }
};
