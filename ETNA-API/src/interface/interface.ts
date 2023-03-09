interface User {
  login: string;
  firstname: string;
  lastname: string;
  absences: [];
  retards: [];
  promo: Promo;
  img: string;
}

interface UserV2 {
  login: string;
  date: string;
  arrival: string;
  type: string;
  justifying?: string;
  boolean?: boolean;
}

interface Promo {
  id: number;
  target_name: string;
  term_name: string;
  learning_start: string;
  learning_end: string;
  learning_duration: number;
  promo: string;
  spe: string;
  wall_name: string;
}

interface Error {
  message: string;
}

export { User, UserV2, Promo, Error };
