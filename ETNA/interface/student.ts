import { Promo } from "../../ETNA-API/src/interface/interface";

export default interface Student {
  login: string;
  isAbsent: boolean;
  isLate: boolean;
  promo: Promo;
  arrival: string;
  absences: Absences[];
  retards: Absences[];
}

interface Absences {
  date: string;
  arrival: string;
  justified: boolean;
  commentary: string;
  run: number;
}
