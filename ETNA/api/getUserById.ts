import { api } from "./api";

export const getUserById = async (login: String) => {
  return await api.get(`/users/${login}`, {
    withCredentials: true,
  });
};
