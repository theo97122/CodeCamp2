import { User, UserV2 } from "../../ETNA-API/src/interface/interface";
import { api } from "./api";

export default async function DeleteIrregularity(user: UserV2) {
  return await api.patch(
    `/users/delete/${user.login}`,
    {
      date: user.date,
      arrival: user.arrival,
      type: user.type,
      justifying: user.justifying,
    },
    {
      withCredentials: true,
    }
  );
}
