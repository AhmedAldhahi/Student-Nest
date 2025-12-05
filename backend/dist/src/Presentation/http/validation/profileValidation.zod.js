"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminProfileSchema = exports.landlordProfileSchema = exports.studentProfileSchema = void 0;
const zod_1 = require("zod");
const hasSequentialNumbers = (str) => {
    return /(\d)\1{2,}/.test(str);
};
const passwordRefinement = (data) => {
    if ((data.oldPassword && !data.newPassword) ||
        (!data.oldPassword && data.newPassword)) {
        return false;
    }
    return true;
};
const baseProfileShape = zod_1.z.object({
    name: zod_1.z.string().min(3).max(30).trim().optional(),
    phoneNumber: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().trim().length(4).optional(),
    address: zod_1.z.string().optional(),
    photo: zod_1.z.any().optional(),
    oldPassword: zod_1.z
        .string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
        .refine((val) => !hasSequentialNumbers(val))
        .optional(),
    newPassword: zod_1.z
        .string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
        .refine((val) => !hasSequentialNumbers(val))
        .optional(),
});
exports.studentProfileSchema = baseProfileShape
    .extend({
    gradateYear: zod_1.z.string().trim().length(4).optional(),
    studentCardId: zod_1.z.string().optional(),
    universityName: zod_1.z.string().optional(),
    major: zod_1.z.string().optional(),
    verificationFiles: zod_1.z.any().optional(),
})
    .strict()
    .refine(passwordRefinement, {
    message: "Both oldPassword and newPassword must be provided together.",
});
exports.landlordProfileSchema = baseProfileShape
    .extend({
    cliQAccount: zod_1.z.string().optional(),
})
    .strict()
    .refine(passwordRefinement, {
    message: "Both oldPassword and newPassword must be provided together.",
});
exports.adminProfileSchema = baseProfileShape
    .strict()
    .refine(passwordRefinement, {
    message: "Both oldPassword and newPassword must be provided together.",
});
