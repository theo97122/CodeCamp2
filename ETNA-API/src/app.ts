require("dotenv").config();
import routes from "./routes";
import { connect } from "./db/index";
import { notCheckedIn } from "./controllers/history.controller";
import { CronJob } from "cron";
import { Application } from "express";
const cors = require("cors");
const express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const app: Application = express();
const port: string = process.env.PORT || "3000";

app.set("trust proxy", true);
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);

connect().catch((err) => console.log(err));

const job = new CronJob(
  "0 12,18 * * *",
  notCheckedIn,
  null,
  true,
  "Europe/Paris"
);
job.start();

app.listen(port, () => {
  console.log(`App launch successfully : http://localhost:${port}`);
});
