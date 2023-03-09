import { Router, Request, Response } from "express";
import {
  getHistory,
  getHistoryByDate,
  createHistory,
  updateHistory,
} from "../controllers/history.controller";

const route: any = Router();

route.get("/", (req: Request, res: Response) => {
  getHistory(req, res);
});

route.get("/:date", (req: Request, res: Response) => {
  getHistoryByDate(req, res);
});

route.patch("/:date", (req: Request, res: Response) => {
  updateHistory(req, res);
});

route.post("/", (req: Request, res: Response) => {
  createHistory(req, res);
});

export default route;
