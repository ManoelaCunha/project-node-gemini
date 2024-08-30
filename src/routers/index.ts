import cors from "cors";
import express, { Application } from "express";
import { measurementRouters } from "./measure.routers";

const routers = (app: Application) => {
  app.use(express.json({ limit: "10mb" }));
  app.use(cors());

  measurementRouters(app);
};

export default routers;
