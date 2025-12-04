import { z } from "zod";

// Helper: Check for sequential numbers
const hasSequentialNumbers = (str: string) => {
  return /(\d)\1{2,}/.test(str);
};

// Helper: Password Refinement Logic (Reused for both schemas)
const passwordRefinement = (data: any) => {
  if (
    (data.oldPassword && !data.newPassword) ||
    (!data.oldPassword && data.newPassword)
  ) {
    return false;
  }
  return true;
};

// 1. Define the BASE SHAPE (The fields shared by everyone)
const baseProfileShape = z.object({
  name: z.string().min(3).max(30).trim().optional(),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.string().trim().length(4).optional(),
  address: z.string().optional(),
  photo: z.any().optional(),

  // Password Rules
  oldPassword: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .refine((val) => !hasSequentialNumbers(val))
    .optional(),
  newPassword: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .refine((val) => !hasSequentialNumbers(val))
    .optional(),
});

// 2. STUDENT SCHEMA
// .strict() ensures that if 'cliQAccount' is sent, it throws an error!
export const studentProfileSchema = baseProfileShape
  .extend({
    gradateYear: z.string().trim().length(4).optional(),
    studentCardId: z.string().optional(),
    universityName: z.string().optional(),
    major: z.string().optional(),
    verificationFiles: z.any().optional(),
  })
  .strict() // <--- THIS IS KEY: Throws error if unknown fields are present
  .refine(passwordRefinement, {
    message: "Both oldPassword and newPassword must be provided together.",
  });

// 3. LANDLORD SCHEMA
export const landlordProfileSchema = baseProfileShape
  .extend({
    cliQAccount: z.string().optional(),
  })
  .strict() // <--- THIS IS KEY: Throws error if Student fields are present
  .refine(passwordRefinement, {
    message: "Both oldPassword and newPassword must be provided together.",
  });

// 4. ADMIN SCHEMA (Assuming Admin is just Base)
export const adminProfileSchema = baseProfileShape
  .strict()
  .refine(passwordRefinement, {
    message: "Both oldPassword and newPassword must be provided together.",
  });