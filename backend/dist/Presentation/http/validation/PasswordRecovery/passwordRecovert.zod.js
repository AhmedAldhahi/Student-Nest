"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgetPasswordSchema = void 0;
const zod_1 = require("zod");
const zodValidationMethod_util_1 = require("../../../../Shared/utils/zodValidationMethod.util");
exports.ForgetPasswordSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, "Password must include uppercase, lowercase, number, and special character")
        .refine((val) => !(0, zodValidationMethod_util_1.hasSequentialNumbers)(val), "Password cannot contain sequential numbers like 123 or 987"),
});
