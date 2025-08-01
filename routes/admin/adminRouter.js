import { Router } from "express";
import admindoctorRouter from "./admindoctorRouter.js";
import adminblogRouter from "./adminblogRouter.js";
import admincontactRouter from "./admincontactRouter.js";
import adminsubcribeRouter from "./adminsubcribeRouter.js";
import adminreviewRouter from "./adminreviewRouter.js";

const adminRouter = Router();

adminRouter.use("/doctor", admindoctorRouter);
adminRouter.use("/blog", adminblogRouter);
adminRouter.use("/contact", admincontactRouter);
adminRouter.use("/subcribe", adminsubcribeRouter);
adminRouter.use("/review", adminreviewRouter);

export default adminRouter;
