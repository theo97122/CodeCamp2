import { api } from "./api";

export const getUserByPromo = async (id: String) => {
  return await api.get(`/users/promo/${id}`, {
    withCredentials: true,
  });
};
