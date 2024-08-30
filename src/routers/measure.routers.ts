import { Application, Router } from "express";

import { MeasurementController } from "../controllers/measure.controller";

import { createMeasurementSchema } from "../schemas/createMeasure.schema";
import { updateMeasurementSchema } from "../schemas/updateMeasure.schema";

import { validateType } from "../middlewares/validateType.middleware";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { verifyMeasureToList } from "../middlewares/verifyMeasureToList.middlewares";
import { verifyMeasureToCreate } from "../middlewares/verifyMeasureToCreate.middleware";
import { verifyMeasureToUpdate } from "../middlewares/verifyMeasureToUpdate.middleware";

const router = Router();

export const measurementRouters = (app: Application) => {
  router.post(
    "/upload",
    validateSchema(createMeasurementSchema),
    verifyMeasureToCreate,
    new MeasurementController().create
  );

  router.patch(
    "/confirm",
    validateSchema(updateMeasurementSchema),
    verifyMeasureToUpdate,
    new MeasurementController().update
  );

  router.get(
    "/:customer_code/list",
    validateType,
    verifyMeasureToList,
    new MeasurementController().list
  );

  app.use(router);
};
