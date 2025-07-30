import { Router } from "express";
import userdoctorRouter from "./userdoctorRouter.js";
import userblogRouter from "./userblogRouter.js";

const userRouter = Router();

userRouter.use("/doctor", userdoctorRouter);
userRouter.use("/blog", userblogRouter);

export default userRouter;
