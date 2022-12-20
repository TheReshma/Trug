import { SurfClient } from "@surfdb/client-sdk";

const clientURL =
  process.env.NODE_ENV == "production"
    ? "http://159.223.50.129:3000"
    : "http://localhost:4200";

export const surfClient = new SurfClient({
  client: clientURL,
});
