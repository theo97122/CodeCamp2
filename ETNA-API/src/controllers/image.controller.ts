import imageModel from "../db/models/image.model";
import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import moment from "moment";
import { Error } from "../interface/interface";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, "");
    cb(null, `${name}-${moment().format("DDMMYYYY")}${ext}`);
  },
});

const upload = multer({
  storage: storage,
}).single("file");

export async function downloadImage(req: Request, res: Response) {
  try {
    const image = await imageModel.find({
      date: moment().format("DD/MM/YYYY"),
    });

    if (!image) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    const randomImage = image[Math.floor(Math.random() * image.length)];

    const base64Image = randomImage.image.toString("base64");
    const imagePath = path.join(
      __dirname,
      "../../../ETNA/assets/uploads/",
      randomImage.name
    );

    fs.writeFileSync(imagePath, base64Image, { encoding: "base64" });

    return res.status(200).json({
      message: "Image downloaded successfully",
      data: {
        name: randomImage.name,
        path: imagePath,
        date: randomImage.date,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
}

export async function uploadImage(req: Request, res: Response) {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      if (!req.file) {
        return res.status(400).json({
          message: "Please upload a file",
        });
      }
      const imagePath = req.file.path;
      const image = await imageModel.create({
        name: "lastImage.jpg",
        image: fs.readFileSync(imagePath),
        date: moment().format("DD/MM/YYYY"),
      });

      return res.status(201).json({
        message: "Image uploaded successfully",
        data: {
          name: image.name,
          path: imagePath,
          date: moment().format("DD/MM/YYYY"),
        },
      });
    });
  } catch (err: any) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
}
