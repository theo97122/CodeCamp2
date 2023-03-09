import { Router, Request, Response } from "express";
import {
  deleteIrregularity,
  getAllstudents,
  getStudentById,
  getStudentByPromo,
  updateStudent,
} from "../controllers/users.controller";

const route: Router = Router();

route.get("/", async (req: Request, res: Response) => {
  await getAllstudents(req, res);
});

route.get("/:id", async (req: Request, res: Response) => {
  await getStudentById(req, res);
});

route.get("/promo/:id", async (req: Request, res: Response) => {
  await getStudentByPromo(req, res);
});

route.patch("/:id", async (req: Request, res: Response) => {
  await updateStudent(req, res);
});

route.patch("/delete/:id", async (req: Request, res: Response) => {
  await deleteIrregularity(req, res);
});

export default route;
