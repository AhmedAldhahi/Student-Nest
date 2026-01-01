import { z } from "zod";

// --- 1. Constants for File Validation ---
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_DOC_TYPES = ["application/pdf", "image/jpeg", "image/png"];

// --- 2. Helper Schema for Single File ---
const multerFileSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  mimetype: z.string(),
  size: z.number().max(MAX_FILE_SIZE, "File size must be less than 5MB"),
});

// --- 3. Main Request Schema ---
export const createApartmentSchema = z.object({
  body: z.object({
    title: z.string().min(10, "Title must be at least 10 characters").max(100),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters"),
    address: z.string().min(5, "Address is required"),

    //  MUST USE COERCE for Form-Data Numbers
    price: z
      .string()
      .min(1, "at least must be 1 jd")
      .max(4, "at most must be 9999 jd"),

    numberOfBed: z.string().min(1).max(2),
    numberOfRoom: z.string().min(1).max(2),

    propertyStatus: z.preprocess((val) => String(val) === "true", z.boolean()),
    isJoin: z.preprocess((val) => String(val) === "true", z.boolean()),

    //  Lat/Long Validation
    googleMapLocationLat: z.coerce
      .number()
      .min(-90)
      .max(90, "Invalid Latitude"),
    googleMapLocationLong: z.coerce
      .number()
      .min(-180)
      .max(180, "Invalid Longitude"),
  }),

  // --- 4. File Validation Section ---
  // We validate 'files' separately because Multer puts them in req.files
  files: z.object({
    apartmentPhoto: z
      .array(multerFileSchema)
      .min(1, "At least one photo is required")
      .max(6, "You can upload a maximum of 6 photos")
      .refine(
        (files) =>
          files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.mimetype)),
        "Only .jpg, .jpeg, .png, and .webp formats are supported for photos."
      ),

    apartmentDocument: z
      .array(multerFileSchema)
      .min(1, "Ownership document is required")
      .max(2, "Max 2 documents allowed")
      .refine(
        (files) =>
          files.every((file) => ACCEPTED_DOC_TYPES.includes(file.mimetype)),
        "Only .pdf, .jpg, and .png formats are supported for documents."
      ),
  }),
}).strict();
