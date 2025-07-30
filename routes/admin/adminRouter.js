import { Router } from "express";
import admindoctorRouter from "./admindoctorRouter.js";
import adminblogRouter from "./adminblogRouter.js";

const adminRouter = Router();

adminRouter.use("/doctor", admindoctorRouter);
adminRouter.use("/blog", adminblogRouter);

export default adminRouter;
