import { Document } from "mongoose";

export interface IMeasure extends Document {
  customer_code: string;
  measure_datetime: Date;
  measure_type: "WATER" | "GAS";
  image_url: string;
  measure_value: number;
  measure_uuid: string;
  has_confirmed: boolean;
}

export interface UploadedFile {
  uri: string;
  name: string;
  mimeType: string;
}

export interface UploadResponse {
  success: boolean;
  file: UploadedFile;
}

export interface RequestList {
  customer_code: string;
  measure_type: string;
}

export interface ValidationError {
  error_code: string;
  error_description: string;
}
