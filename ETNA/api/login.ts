import { AxiosError, AxiosResponse } from "axios";
import { api } from "./api";
import User from "../interface/user";
import { Route } from "react-native";

export default async function Auth(user: User, navigation: Route) {
  api
    .post("/auth", user)
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        if (
          res.data.groups.includes("admin") ||
          res.data.login === "ourlis_s" ||
          res.data.login === "manico_y" ||
          res.data.login === "brunet_e" ||
          res.data.login === "salama_a" ||
          res.data.login === "ambrai_t"
        ) {
          navigation.navigate("Home");
          return true;
        } else {
          alert("You are not an admin, you can't use this tool.");
          return false;
        }
      }
    })
    .catch((err: AxiosError) => {
      alert("Wrong username or password");
      console.log(err.message);
      return false;
    });
}
