import { z } from "zod";
export const currentYear = new Date().getFullYear();
export const MIN_AGE = 18;

export const roleEnum = z.enum(["admin", "student", "landloard"]);

export const testRate = 1000;
