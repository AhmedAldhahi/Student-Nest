"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP = void 0;
var OTPException_exception_1 = require("../exception/OTPException.exception");
var OTP = /** @class */ (function () {
    function OTP(value, expiresInMinutes) {
        if (expiresInMinutes === void 0) { expiresInMinutes = 10; }
        this.value = value;
        this.expiresAt = new Date(Date.now() + expiresInMinutes * 60000);
    }
    OTP.generate = function () {
        var val = Math.floor(100000 + Math.random() * 900000).toString();
        return new OTP(val);
    };
    OTP.prototype.getExpiresAt = function () {
        return this.expiresAt;
    };
    OTP.prototype.getValue = function () {
        return this.value;
    };
    OTP.prototype.isExpired = function () {
        return new Date() > this.expiresAt;
    };
    OTP.prototype.verfiedOtp = function (clientOtp) {
        if (this.isExpired()) {
            // 1. Check for expiration first
            throw new OTPException_exception_1.OtpCodeException("OTP has expired.");
        }
        if (clientOtp !== this.value) {
            // 2. Check if the value matches
            throw new OTPException_exception_1.OtpCodeException("Invalid OTP code.");
        }
        // 3. If it's not expired and matches, it's valid
        return true;
    };
    return OTP;
}());
exports.OTP = OTP;
