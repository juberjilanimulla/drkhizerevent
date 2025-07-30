import { Router } from "express";
import {
  errorResponse,
  successResponse,
} from "../../helpers/serverResponse.js";
import blogmodel from "../../model/blogmodel.js";

const userblogRouter = Router();

userblogRouter.get("/", getallblogHandler);

export default userblogRouter;

async function getallblogHandler(req, res) {
  try {
    const blog = await blogmodel.find().sort({ createdAt: -1 });
    successResponse(res, "successfully", blog);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
