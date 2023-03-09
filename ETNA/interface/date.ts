import Student from "./student";

export interface ListePresence {
  _id: string;
  date: string;
  moment: string;
  users: Student[];
}
