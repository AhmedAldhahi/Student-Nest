"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmail = void 0;
class UserEmail {
    constructor(value) {
        this.value = value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value) || value.trim().length < 10) {
            throw new Error("A valid email is required.");
        }
    }
    getValue() {
        return this.value;
    }
}
exports.UserEmail = UserEmail;
