import express from "express";
import config from "./config.js";
import dbConnect from "./db.js";
import authRouter from "./routes/auth/authRouter.js";
import { Admin } from "./helpers/helperFunction.js";
import morgan from "morgan";
import cors from "cors";





const app = express();
const port = config.PORT;

//routes
app.use("/api/auth", authRouter);

//database connected successfully
dbConnect()
  .then(() => {
    Admin();
    app.listen(port, () => {
      console.log(`server listening at ${port}`);
    });
  })
  .catch((error) => {
    console.log("unable to connected to server", error);
  });
