import express from "express";
import config from "./config.js";
import dbConnect from "./db";

const app = express();
const port = config.PORT;




//database connected successfully
dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`server listening at ${port}`);
    });
  })
  .catch((error) => {
    console.log("unable to connected to server", error);
  });
