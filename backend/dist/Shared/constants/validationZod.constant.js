"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRate = exports.roleEnum = exports.MIN_AGE = exports.currentYear = void 0;
const zod_1 = require("zod");
exports.currentYear = new Date().getFullYear();
exports.MIN_AGE = 18;
exports.roleEnum = zod_1.z.enum(["admin", "student", "landloard"]);
exports.testRate = 1000;
