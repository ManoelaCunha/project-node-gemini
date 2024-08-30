import { NextFunction, Request, Response } from "express";
import { Measure } from "../models/measure";
import { IMeasure } from "../interfaces";
import { FilterQuery } from "mongoose";

export const verifyMeasureToList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { customer_code } = req.params as Partial<IMeasure>;
  const { measure_type } = req.query as Partial<IMeasure>;

  const query: FilterQuery<IMeasure> = { customer_code };

  if (measure_type) {
    query.measure_type = measure_type;
  }

  const measures = await Measure.find(query);

  if (measures.length === 0) {
    return res.status(404).json({
      error_code: "MEASURES_NOT_FOUND",
      error_description: "Nenhuma leitura encontrada",
    });
  }

  return next();
};
