import { Request, Response } from "express";
import { Measure } from "../models/measure";
import { IMeasure, UploadResponse } from "../interfaces";
import { FilterQuery } from "mongoose";

import { decodingBase64 } from "../services/decodingBase64.service";
import { imageProcessing } from "../services/imageProcessing.service";
import { imageUpload } from "../services/imageUpload.service";

export class MeasurementController {
  async create(req: Request, res: Response) {
    const { image, customer_code, measure_datetime, measure_type } = req.body;
    console.log("body 2", req.body);

    try {
      const { type, tempFilePath } = await decodingBase64(image);
      const mimeType = type?.mime || "image/jpeg";

      // Interagir com o Gemini para obter o valor da medida
      const uploadResponse = await imageUpload(tempFilePath, mimeType);
      const { file } = uploadResponse;

      const { measure_value } = await imageProcessing(
        uploadResponse,
        measure_type
      );
      //

      const newMeasure = new Measure({
        customer_code,
        measure_datetime,
        measure_type,
        image_url: file.uri,
        measure_value,
      });

      await newMeasure.save();

      res.status(201).json({
        image_url: newMeasure.image_url,
        measure_value: newMeasure.measure_value,
        measure_uuid: newMeasure.measure_uuid,
      });
    } catch (error: any) {
      res.status(500).json({
        error_code: "SERVER_ERROR",
        error_description: error.message || "Internal Server Error",
      });
    }
  }

  async update(req: Request, res: Response) {
    const { measure_uuid, confirmed_value } = req.body;

    try {
      await Measure.findOneAndUpdate(
        { measure_uuid },
        { $set: { measure_value: confirmed_value, has_confirmed: true } }
      );

      res.status(200).json({ success: true });
    } catch (error: any) {
      res.status(500).json({
        error_code: "SERVER_ERROR",
        error_description: error.message || "Internal Server Error",
      });
    }
  }

  async list(req: Request, res: Response) {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    try {
      const query: FilterQuery<IMeasure> = { customer_code };

      if (measure_type) {
        query.measure_type = measure_type;
      }

      const measures = await Measure.find(query);

      res.status(200).json({
        customer_code,
        measures: measures.map((measure) => ({
          measure_uuid: measure.measure_uuid,
          measure_datetime: measure.measure_datetime,
          measure_type: measure.measure_type,
          has_confirmed: measure.has_confirmed,
          image_url: measure.image_url,
        })),
      });
    } catch (error: any) {
      res.status(500).json({
        error_code: "SERVER_ERROR",
        error_description: error.message || "Internal Server Error",
      });
    }
  }
}
