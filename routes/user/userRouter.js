import { Router } from "express";
import userdoctorRouter from "./userdoctorRouter.js";
import userblogRouter from "./userblogRouter.js";
import usercontactRouter from "./usercontactRouter.js";

const userRouter = Router();

userRouter.use("/doctor", userdoctorRouter);
userRouter.use("/blog", userblogRouter);
userRouter.use("/contact", usercontactRouter);

export default userRouter;
