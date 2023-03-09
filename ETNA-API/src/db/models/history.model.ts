import { Schema, model } from "mongoose";
import userModel from "./user.model";

const dataSchema: Schema = new Schema({
  date: { type: String, required: true },
  moment: { type: String, required: true },
  users: { type: Array, required: true },
});

export default model("history", dataSchema);
