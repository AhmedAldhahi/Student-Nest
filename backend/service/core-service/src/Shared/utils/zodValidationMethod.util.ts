import { z } from "zod";
import { currentYear, MIN_AGE } from "../constants/validationZod.constant";
// it start from current untill 8 year
// 1. Get the current year

// 2. Calculate the maximum allowed year
const maxYear = currentYear + 8;

export const graduationYearSchema = z
  .number({
    message: "Graduation year must be a number.",
  })
  .int({
    message: "Graduation year must be a whole number.",
  })
  // 3. Set the minimum year (Rule 1: "at least this year")
  .min(currentYear, {
    message: `Graduation year must be at least ${currentYear}.`,
  })
  // 4. Set the maximum year (Rule 2: "at most 8 year after")
  .max(maxYear, {
    message: `Graduation year cannot be more than ${maxYear}.`,
  });

// export const DateOfBirth = z
//   .number()
//   .int()
//   .refine((year) => {
//     const currentYear = new Date().getFullYear();
//     const age = currentYear - year;
//     return age >= MIN_AGE;
//   }, `User must be at least ${MIN_AGE} years old`)
//   .refine((year) => {
//     const currentYear = new Date().getFullYear();
//     return year > 1900 && year <= currentYear; // optional sanity check
//   }, "Year must be a valid number");

export function hasSequentialNumbers(password: string): boolean {
  const sequences = ["0123456789", "1234567890", "9876543210", "876543210"];
  for (const seq of sequences) {
    for (let i = 0; i <= seq.length - 3; i++) {
      const sub = seq.substring(i, i + 3); // check 3+ sequential numbers
      if (password.includes(sub)) return true;
    }
  }
  return false;
}

export const DateOfBirth = z
  .string()
  .trim()
  .length(4, "invalid date of birth !!");
