import { Schema, model } from "mongoose";

const dataSchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: Buffer, contentType: String, required: true },
  date: { type: String, required: true },
});

export default model("images", dataSchema);
