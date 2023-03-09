import { UserV2 } from "../../ETNA-API/src/interface/interface";
import { api } from "./api";

export default async function Justify(user: UserV2) {
  return await api.patch(`/users/${user.login}`, {
    justifying: user.justifying,
    date: user.date,
    arrival: user.arrival,
    type: user.type,
    boolean: user.boolean,
  });
}
