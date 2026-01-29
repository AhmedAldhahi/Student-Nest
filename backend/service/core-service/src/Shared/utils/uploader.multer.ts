import multer from "multer";

const uploads = multer({
  storage: multer.memoryStorage(), // IMPORTANT for Cloudinary
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per image
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"));
    }
    cb(null, true);
  },
});

export default uploads;
