import express, { Application } from "express";
import cors from "cors";

const routers = (app: Application) => {
  app.use(express.json());
  app.use(cors());
};

export default routers;
