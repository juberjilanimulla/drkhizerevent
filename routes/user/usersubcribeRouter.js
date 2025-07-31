import { Router } from "express";
import {
  errorResponse,
  successResponse,
} from "../../helpers/serverResponse.js";
import subcribemodel from "../../model/subcribemodel.js";

const usersubcribeRouter = Router();
usersubcribeRouter.post("/create", createsubcribeHandler);
export default usersubcribeRouter;

async function createsubcribeHandler(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return errorResponse(res, 400, "some params are missing");
    }
    const existingemail = await subcribemodel.findOne({ email });
    if (existingemail) {
      return errorResponse(res, 404, "Already in the Subscription List");
    }
    const subcribe = await subcribemodel.create({ email });
    successResponse(res, "success", subcribe);
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
