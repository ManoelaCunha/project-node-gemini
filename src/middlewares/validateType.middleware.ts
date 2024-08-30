import { NextFunction, Request, Response } from "express";
import { IMeasure } from "../interfaces";

export const validateType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { measure_type } = req.query as Partial<IMeasure>;

  if (measure_type && !["WATER", "GAS"].includes(measure_type)) {
    return res.status(400).json({
      error_code: "INVALID_TYPE",
      error_description: "Tipo de medição não permitida",
    });
  }

  return next();
};
