import { Router, Request, Response } from "express";
import { login, checkAuth } from "../controllers/auth.controller";
const route: any = Router();

route.post("/", (req: Request, res: Response) => {
  login(req, res);
});

route.get("/", (req: Request, res: Response) => {
  checkAuth(req, res);
});

export default route;
