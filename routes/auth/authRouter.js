import { Router } from "express";
import {
  errorResponse,
  succcessResponse,
} from "../../helpers/serverResponse.js";
import usermodel from "../../model/usermodel.js";

const authRouter = Router();

export default authRouter;

async function signinHandler(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(res, 400, "some params are missing");
    }
    const user = await usermodel.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "user is not exist");
    }
    
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
