import axios from "axios";
import { api } from "./api";

export default async function getPromo(id: string) {
  return await api.get(`/trombi/${id}`, {
    withCredentials: true,
  });
}
