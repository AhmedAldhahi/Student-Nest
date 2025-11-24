"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentGraduateYear = void 0;
const validationZod_constant_1 = require("../../Shared/constants/validationZod.constant");
class studentGraduateYear {
    constructor(value) {
        this.value = value;
        if (!value)
            throw new Error("student Graduated year is required");
        if (value < validationZod_constant_1.currentYear)
            throw new Error("invalid graduate year !!");
    }
    getValue() {
        return this.value;
    }
}
exports.studentGraduateYear = studentGraduateYear;
