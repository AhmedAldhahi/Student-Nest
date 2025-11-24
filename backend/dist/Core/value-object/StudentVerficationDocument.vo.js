"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentVerificationDocument = void 0;
class StudentVerificationDocument {
    constructor(value) {
        this.value = value;
        if (!value)
            throw new Error("validate document is required !!");
    }
    getValue() {
        return this.value;
    }
}
exports.StudentVerificationDocument = StudentVerificationDocument;
