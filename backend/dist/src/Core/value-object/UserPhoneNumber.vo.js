"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPhoneNumber = void 0;
class userPhoneNumber {
    constructor(value) {
        this.value = value;
        if (!value || value.trim().length === 0)
            throw new Error("Phone number is required");
        const trimmed = value.trim();
        const phoneRegex = /^(?:(?:\+962|00)\s?0?|0)?\s?(7[789])\s?(\d{7})$/;
        if (!phoneRegex.test(trimmed)) {
            throw new Error("Invalid phone number. Use international format (+[country code][number]) or Jordanian format (+9627XXXXXXXX, 009627XXXXXXXX, 07XXXXXXXX).");
        }
    }
    getValue() {
        return this.value;
    }
}
exports.userPhoneNumber = userPhoneNumber;
