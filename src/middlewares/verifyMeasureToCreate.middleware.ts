import moment from "moment";

import { NextFunction, Request, Response } from "express";
import { Measure } from "../models/measure";
import { IMeasure } from "../interfaces";

export const verifyMeasureToCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { customer_code, measure_datetime, measure_type } =
    req.body as Partial<IMeasure>;

  const entryMonth = moment(measure_datetime).add(1, "months").month();

  const existingMeasure = await Measure.findOne({
    customer_code,
    measure_type,
  });

  if (existingMeasure) {
    const { measure_datetime } = existingMeasure;
    const savedMonth = moment(measure_datetime).add(1, "months").month();

    if (entryMonth === savedMonth) {
      return res.status(409).json({
        error_code: "DOUBLE_REPORT",
        error_description: "Leitura do mês já realizada",
      });
    }
  }

  return next();
};
