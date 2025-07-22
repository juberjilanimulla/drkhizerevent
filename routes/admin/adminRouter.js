import { Router } from "express";
import admindoctorRouter from "./admindoctorRouter.js";

const adminRouter = Router();

adminRouter.use("/doctor", admindoctorRouter);

export default adminRouter;
