import { Router } from "express";
import AllRouter from "./routes";

const routes = Router();

routes.use("/be-golf", AllRouter);

export default routes;
