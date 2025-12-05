"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterLandloardSchema = exports.RegisterStudetSchema = void 0;
const zod_1 = require("zod");
const zodValidationMethod_util_1 = require("../../../../Shared/utils/zodValidationMethod.util");
const UserRole_enum_1 = require("../../../../Core/enum/UserRole.enum");
const basedUserSchema = zod_1.z.object({
    email: zod_1.z.email(),
    name: zod_1.z
        .string()
        .min(3, "student name is too short")
        .max(30, "student name is too long")
        .trim(),
    phoneNumber: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().trim().length(4, "invalid date of birth !!"),
    role: UserRole_enum_1.UserRole,
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, "Password must include uppercase, lowercase, number, and special character")
        .refine((val) => !(0, zodValidationMethod_util_1.hasSequentialNumbers)(val), "Password cannot contain sequential numbers like 123 or 987"),
});
exports.RegisterStudetSchema = basedUserSchema
    .extend({
    gradateYear: zod_1.z.string().trim().length(4, "invalid graduate year formate"),
    studentCardId: zod_1.z.string(),
    universityName: zod_1.z.string(),
    studentGovId: zod_1.z.string(),
    role: zod_1.z.literal("student"),
    major: zod_1.z.string(),
    address: zod_1.z.string().optional(),
    verificationFiles: zod_1.z.any(),
})
    .strict();
exports.RegisterLandloardSchema = basedUserSchema
    .extend({
    cliQAccount: zod_1.z.string(),
    LandloardGovId: zod_1.z.string(),
    role: zod_1.z.literal("landloard"),
    address: zod_1.z.string().optional(),
})
    .strict();
