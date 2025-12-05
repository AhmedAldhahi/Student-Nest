"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentCard = void 0;
class StudentCard {
    constructor(value) {
        this.value = value;
        if (!value)
            throw new Error("student card is required");
        const trimmed = value.trim();
        if (trimmed.length < 8) {
            throw new Error("Invalid student card id ");
        }
    }
    getValue() {
        return this.value;
    }
}
exports.StudentCard = StudentCard;
