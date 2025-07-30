import { Router } from "express";
import multer from "multer";
import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {
  successResponse,
  errorResponse,
} from "../../helpers/serverResponse.js";
import blogmodel from "../../model/blogmodel.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// AWS S3 Setup
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Multer Setup (temporary local storage before uploading to S3)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../temp");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(ext);
    if (isImage) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
}).single("blogimages"); // Support multiple files (max 10)

const adminblogimagesRouter = Router();

// MULTI IMAGE UPLOAD
adminblogimagesRouter.post("/:id", (req, res) => {
  upload(req, res, async (err) => {
    if (err) return errorResponse(res, 400, err.message || "Upload error");
    if (!req.files) return errorResponse(res, 400, "No files uploaded");

    try {
      const blog = await blogmodel.findById(req.params.id);
      if (!blog) {
        fs.unlinkSync(req.file.path);
        return errorResponse(res, 404, "Blog not found");
      }

      const fileContent = fs.readFileSync(file.path);
      const fileName = `${req.params.id}-${Date.now()}${path.extname(
        file.originalname
      )}`;
      const s3Key = `blogimages/${fileName}`;

      const s3Res = await s3
        .upload({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: s3Key,
          Body: fileContent,
          ContentType: file.mimetype,
        })
        .promise();

      blog.coverimage.push(s3Res.Location); // Add image URL
      fs.unlinkSync(file.path); // Remove temp file

      await blog.save();
      return successResponse(res, "Images uploaded successfully", blog);
    } catch (error) {
      console.error("Upload failed:", error.message);
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      });
      return errorResponse(res, 500, "Image upload failed");
    }
  });
});

export default adminblogimagesRouter;
