"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentUniversity = void 0;
class StudentUniversity {
    constructor(value) {
        this.value = value;
        if (!value)
            throw new Error("university Name is required");
        const UniversityPattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
        const trimmedName = value.trim();
        if (!UniversityPattern.test(trimmedName)) {
            throw new Error("Invalid University: only letters and single spaces are allowed. No numbers or special characters");
        }
    }
    getValue() {
        return this.value;
    }
}
exports.StudentUniversity = StudentUniversity;
