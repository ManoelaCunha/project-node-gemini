import Joi from "joi";

export const updateMeasurementSchema = Joi.object({
  measure_uuid: Joi.string().required(),
  confirmed_value: Joi.number().integer().required(),
});
