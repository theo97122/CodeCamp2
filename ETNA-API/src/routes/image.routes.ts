import { Router, Request, Response } from "express";
import { uploadImage, downloadImage } from "../controllers/image.controller";

const route: any = Router();

route.get("/", (req: Request, res: Response) => {
  downloadImage(req, res);
});

route.post("/", (req: Request, res: Response) => {
  uploadImage(req, res);
});

export default route;
