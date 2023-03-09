import { api } from "./api";
import moment from "moment";

export const scan = async (login: string, date: string, momentDay: string) => {
  const today = moment(date, "DD/MM/YYYY").format("DD%2FMM%2FYYYY");

  return await api.patch(
    `/history/${today}`,
    { login: login.toString(), moment: momentDay.toString() },
    {
      withCredentials: true,
    }
  );
};
