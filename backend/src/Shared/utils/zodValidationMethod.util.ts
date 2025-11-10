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

export const DateOfBirth = z
  .string()
  .refine((val) => {
    const date = new Date(val);
    if (isNaN(date.getTime())) return false; // invalid date
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
    return age >= MIN_AGE;
  }, `User must be at least ${MIN_AGE} years old`)
  .transform((val) => new Date(val));

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


