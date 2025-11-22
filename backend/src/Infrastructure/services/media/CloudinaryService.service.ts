import { IFileStorageService } from "../../../Application/interfaces/IFileStorage.interface";
import { v2 as cloudinary } from "cloudinary";

export class CloudinaryService implements IFileStorageService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async upload(file: Express.Multer.File): Promise<string> {
    try {
      // 1. Validation
      if (!file || !file.buffer) {
        throw new Error("File buffer is missing. Ensure multer is using memoryStorage.");
      }

      // 2. Convert Buffer to Base64 Data URI
      // This allows us to use 'await' directly without 'streamifier' or callbacks
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = "data:" + file.mimetype + ";base64," + b64;

      // 3. Upload directly using await
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "app_uploads", // Change this folder name if you want
        resource_type: "auto",
      });

      // 4. Generate Optimized URL
      // This creates a fast, compressed URL for your frontend
      const optimizedUrl = cloudinary.url(result.public_id, {
        secure: true,
        transformation: [
          { width: 500, height: 500, crop: "fill", gravity: "auto" }, // Face detection crop
          { quality: "auto", fetch_format: "auto" }, // Auto format (webp/jpg)
        ],
      });

      return optimizedUrl;

    } catch (error: any) {
      console.error("Cloudinary Upload Failed:", error);
      throw new Error(error.message || "Image upload failed");
    }
  }
}