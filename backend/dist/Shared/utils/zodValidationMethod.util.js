"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateOfBirth = exports.graduationYearSchema = void 0;
exports.hasSequentialNumbers = hasSequentialNumbers;
const zod_1 = require("zod");
const validationZod_constant_1 = require("../constants/validationZod.constant");
const maxYear = validationZod_constant_1.currentYear + 8;
exports.graduationYearSchema = zod_1.z
    .number({
    message: "Graduation year must be a number.",
})
    .int({
    message: "Graduation year must be a whole number.",
})
    .min(validationZod_constant_1.currentYear, {
    message: `Graduation year must be at least ${validationZod_constant_1.currentYear}.`,
})
    .max(maxYear, {
    message: `Graduation year cannot be more than ${maxYear}.`,
});
function hasSequentialNumbers(password) {
    const sequences = ["0123456789", "1234567890", "9876543210", "876543210"];
    for (const seq of sequences) {
        for (let i = 0; i <= seq.length - 3; i++) {
            const sub = seq.substring(i, i + 3);
            if (password.includes(sub))
                return true;
        }
    }
    return false;
}
exports.DateOfBirth = zod_1.z
    .string()
    .trim()
    .length(4, "invalid date of birth !!");
