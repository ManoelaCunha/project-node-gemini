import express, { Application } from "express";
import routers from "./routers";

const app: Application = express();
routers(app);

export default app;
