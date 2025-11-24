"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const cloudinary_1 = require("cloudinary");
class CloudinaryService {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    async upload(file) {
        try {
            if (!file || !file.buffer) {
                throw new Error("File buffer is missing. Ensure multer is using memoryStorage.");
            }
            const b64 = Buffer.from(file.buffer).toString("base64");
            const dataURI = "data:" + file.mimetype + ";base64," + b64;
            const result = await cloudinary_1.v2.uploader.upload(dataURI, {
                folder: "app_uploads",
                resource_type: "auto",
            });
            const optimizedUrl = cloudinary_1.v2.url(result.public_id, {
                secure: true,
                transformation: [
                    { width: 500, height: 500, crop: "fill", gravity: "auto" },
                    { quality: "auto", fetch_format: "auto" },
                ],
            });
            return optimizedUrl;
        }
        catch (error) {
            console.error("Cloudinary Upload Failed:", error);
            throw new Error(error.message || "Image upload failed");
        }
    }
}
exports.CloudinaryService = CloudinaryService;
