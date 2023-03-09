import { Router, Request, Response } from "express";
import { ById, trombi } from "../controllers/trombi.controller";

const route: Router = Router();

route.get("/", (req: Request, res: Response) => {
  trombi(req, res);
});

route.get("/:id", (req: Request, res: Response) => {
  ById(req, res);
});

export default route;
