const axios = require("axios");
import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  const { login, password } = req.body || { login: null, password: null };

  if (!login || !password) {
    res.send({ status: 400, message: "Missing login or password" });
    return;
  }

  try {
    var response = await axios.post(
      "https://auth.etna-alternance.net/identity",
      {
        login,
        password,
      }
    );
  } catch (error) {
    res.send({ status: 400, message: "Wrong login or password" });
    return;
  }

  const token: string = response.headers["set-cookie"][0].replace(
    "authenticator=",
    ""
  );
  const data = response.data;
  res.cookie("authenticator", token);
  res.send({
    id: data.id,
    login: data.login,
    email: data.email,
    img: `https://auth.etna-alternance.net/api/users/${data.login}/photo`,
    logas: data.logas,
    isAdmin: data.groups.includes("adm"),
    groups: data.groups,
    login_date: data.login_date,
    token: "authenticator=" + token,
  });
}

export async function checkAuth(req: Request, res: Response) {
  const { authenticator } = req.cookies || { authenticator: null };
  if (!authenticator) {
    res.send({ status: 400, message: "Missing token" });
    return;
  }

  try {
    var response = await axios.get("https://auth.etna-alternance.net", {
      headers: {
        Cookie: "authenticator=" + authenticator,
      },
    });
  } catch (error) {
    res.send({ status: 400, message: "Wrong token" });
    return;
  }

  const data = response.data;

  res.send({
    id: data.id,
    login: data.login,
    email: data.email,
    img: `https://auth.etna-alternance.net/api/users/${data.login}/photo`,
    logas: data.logas,
    isAdmin: data.groups.includes("adm"),
    groups: data.groups,
    login_date: data.login_date,
    token: "authenticator=" + authenticator,
  });
}
