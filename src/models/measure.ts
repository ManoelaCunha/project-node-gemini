import { Schema, model } from "mongoose";
import { IMeasure } from "../interfaces";
import { v4 as uuidv4 } from "uuid";

const measureSchema = new Schema<IMeasure>({
  customer_code: { type: String, required: true },
  measure_datetime: { type: Date, required: true },
  measure_type: { type: String, enum: ["WATER", "GAS"], required: true },
  image_url: { type: String, required: true },
  measure_value: { type: Number, required: true },
  measure_uuid: { type: String, default: uuidv4 },
  has_confirmed: { type: Boolean, default: false },
});

export const Measure = model<IMeasure>("Measure", measureSchema);
