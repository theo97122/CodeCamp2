import { api } from "./api";

export const getAll = async () => {
  return await api.get("/users", {
    withCredentials: true,
  });
};
