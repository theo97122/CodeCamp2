import { api } from "./api";

export default async function GetImageHistory() {
  return await api.get("/images", {
    withCredentials: true,
  });
}
