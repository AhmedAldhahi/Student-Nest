"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP = void 0;
class OTP {
    constructor(value, expiresInMinutes = 10) {
        this.value = value;
        this.expiresAt = new Date(Date.now() + expiresInMinutes * 60000);
    }
    static generate() {
        const val = Math.floor(100000 + Math.random() * 900000).toString();
        return new OTP(val);
    }
    getExpiresAt() {
        return this.expiresAt;
    }
    getValue() {
        return this.value;
    }
    isExpired() {
        return new Date() > this.expiresAt;
    }
    verfiedOtp(clientOtp) {
        if (this.isExpired()) {
            throw new Error("OTP has expired.");
        }
        if (clientOtp !== this.value) {
            throw new Error("Invalid OTP code.");
        }
        return true;
    }
}
exports.OTP = OTP;
