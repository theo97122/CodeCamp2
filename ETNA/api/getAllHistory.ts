import { api } from "./api";

export const getAllHistory = async () => {
  return await api.get("/history", {
    withCredentials: true,
  });
};
