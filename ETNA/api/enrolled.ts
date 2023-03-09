import { api } from "./api";
import moment from "moment";
import { ListePresence } from "../interface/date";

export const enrolled = async (
  login: string,
  date: ListePresence,
  momentDay: string
) => {
  const today = moment(date.date, "DD/MM/YYYY").format("DD%2FMM%2FYYYY");

  return await api.patch(
    `/history/${today}`,
    { login: login.toString(), moment: momentDay.toString() },
    {
      withCredentials: true,
    }
  );
};
