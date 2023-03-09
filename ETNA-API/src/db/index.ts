import { MongoError } from "mongodb";
import * as mongoose from "mongoose";

const db: string = process.env.DATABASE || "mongodb://localhost:27017/etna-api";

export async function connect() {
  const returnState: any = await mongoose
    .connect(db)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err: MongoError) => {
      console.log("Error while connecting to database");
      console.log(err);
    });
  return returnState;
}
