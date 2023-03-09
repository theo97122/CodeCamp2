import { api } from "./api";

export const createHistory = async () => {
  return await api.post("/history", {
    withCredentials: true,
  });
};
