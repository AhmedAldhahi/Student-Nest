"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentMajor = void 0;
class StudentMajor {
    constructor(value) {
        this.value = value;
        if (!value)
            throw new Error("studentMajor is required");
        const majorPattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
        if (!majorPattern.test(value.trim())) {
            throw new Error("Invalid major: only letters and single spaces are allowed. No numbers or special characters");
        }
    }
    getValue() {
        return this.value;
    }
}
exports.StudentMajor = StudentMajor;
