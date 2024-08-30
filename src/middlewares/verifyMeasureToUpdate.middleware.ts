import { NextFunction, Request, Response } from "express";
import { Measure } from "../models/measure";
import { IMeasure } from "../interfaces";

export const verifyMeasureToUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { measure_uuid } = req.body as Partial<IMeasure>;

  const measure = await Measure.findOne({ measure_uuid });

  if (!measure) {
    return res.status(404).json({
      error_code: "MEASURE_NOT_FOUND",
      error_description: "Nenhuma leitura encontrada",
    });
  }

  if (measure.has_confirmed) {
    return res.status(409).json({
      error_code: "CONFIRMATION_DUPLICATE",
      error_description: "Leitura do mês já realizada",
    });
  }

  return next();
};
