import { Router } from "express";
import userdoctorRouter from "./userdoctorRouter.js";
import userblogRouter from "./userblogRouter.js";
import usercontactRouter from "./usercontactRouter.js";
import usersubcribeRouter from "./usersubcribeRouter.js";

const userRouter = Router();

userRouter.use("/doctor", userdoctorRouter);
userRouter.use("/blog", userblogRouter);
userRouter.use("/contact", usercontactRouter);
userRouter.use("/subcribe", usersubcribeRouter);

export default userRouter;
