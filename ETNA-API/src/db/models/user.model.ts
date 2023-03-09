import { Schema, model } from "mongoose";

const dataSchema: Schema = new Schema({
  login: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  promo: { type: Object, required: true },
  img: { type: String, required: true },
  absences: { type: Array, required: true },
  retards: { type: Array, required: true },
});

export default model("users", dataSchema);
