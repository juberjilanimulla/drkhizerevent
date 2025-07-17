import { Router } from "express";
import userdoctorRouter from "./userdoctorRouter.js";

const userRouter = Router();

userRouter.use("/doctor", userdoctorRouter);

export default userRouter;
