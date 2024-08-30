import Joi from "joi";

export const createMeasurementSchema = Joi.object({
  image: Joi.string().base64().required(),
  customer_code: Joi.string().required(),
  measure_datetime: Joi.date().iso().required(),
  measure_type: Joi.string().valid("WATER", "GAS").required(),
});
