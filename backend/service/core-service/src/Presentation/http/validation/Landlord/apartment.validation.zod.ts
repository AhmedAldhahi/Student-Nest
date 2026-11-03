import { z } from "zod";

// --- 1. Constants for File Validation ---
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// --- 2. Helper Schema for Single File ---
const multerFileSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  mimetype: z.string(),
  size: z.number().max(MAX_FILE_SIZE, "File size must be less than 5MB"),
});

export const createApartmentSchema = z
  .object({
    body: z.object({
      title: z
        .string()
        .min(10, "Title must be at least 10 characters")
        .max(100),
      description: z
        .string()
        .min(20, "Description must be at least 20 characters"),
      address: z.string().min(5, "Address is required"),

      price: z
        .string()
        .min(1, "Price is required")
        .max(4, "Price cannot be more than 4 digits (max 9999)")
        .regex(/^\d+$/, "Price must be a whole number"),

      numberOfBed: z
        .string()
        .min(1, "Required")
        .max(2, "Max 2 digits") // Allows "99" beds max
        .regex(/^\d+$/, "Must be a number"),

      numberOfRoom: z
        .string()
        .min(1, "Required")
        .max(2, "Max 2 digits")
        .regex(/^\d+$/, "Must be a number"),

      // Booleans logic (Correct)
      propertyStatus: z.preprocess(
        (val) => String(val) === "true",
        z.boolean(),
      ),
      isJoin: z.preprocess((val) => String(val) === "true", z.boolean()),
      includeUtilities: z.string().max(255).optional(),
      houseRule: z.string().max(255, "the max size of character is 255"),

      // Coercion logic (Correct for Map logic)
      googleMapLocationLat: z.string().min(1).max(24),
      googleMapLocationLong: z.string().min(1).max(24),
    }),

    // --- 4. File Validation Section ---
    files: z.object({
      apartmentPhoto: z
        .array(multerFileSchema)
        .min(1, "At least one photo is required")
        .max(6, "You can upload a maximum of 6 photos")
        .refine(
          (files) =>
            files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.mimetype)),
          "Only .jpg, .jpeg, .png, and .webp formats are supported for photos.",
        ),
    }),
  })
  .strict();

// --- 3. Main Request Schema ---
export const UpdateApartmentSchema = z
  .object({
    body: z.object({
      title: z
        .string()
        .min(10, "Title must be at least 10 characters")
        .max(100)
        .optional(),
      description: z
        .string()
        .min(20, "Description must be at least 20 characters")
        .optional(),
      address: z.string().min(5, "Address is required").optional(),

      price: z
        .string()
        .min(1, "Price is required")
        .max(4, "Price cannot be more than 4 digits (max 9999)")
        .regex(/^\d+$/, "Price must be a whole number")
        .optional(),

      numberOfBed: z
        .string()
        .min(1, "Required")
        .max(2, "Max 2 digits") // Allows "99" beds max
        .regex(/^\d+$/, "Must be a number")
        .optional(),

      numberOfRoom: z
        .string()
        .min(1, "Required")
        .max(2, "Max 2 digits")
        .regex(/^\d+$/, "Must be a number")
        .optional(),

      // Booleans logic (Correct)
      propertyStatus: z.preprocess(
        (val) => String(val) === "true",
        z.boolean().optional(),
      ),
      isJoin: z
        .preprocess((val) => String(val) === "true", z.boolean())
        .optional(),
      includeUtilities: z.string().max(255).optional(),
      houseRule: z
        .string()
        .max(255, "the max size of character is 255")
        .optional(),

      // Coercion logic (Correct for Map logic)
      googleMapLocationLat: z.string().min(1).max(24).optional(),
      googleMapLocationLong: z.string().min(1).max(24).optional(),
    }),

    // --- 4. File Validation Section ---
    files: z.object({
      apartmentPhoto: z
        .array(multerFileSchema)
        .min(1, "At least one photo is required")
        .max(6, "You can upload a maximum of 6 photos")
        .refine(
          (files) =>
            files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.mimetype)),
          "Only .jpg, .jpeg, .png, and .webp formats are supported for photos.",
        )
        .optional(),
    }),
  })
  .strict();
