"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpCodeException = void 0;
const DomainException_exception_1 = require("./DomainException.exception");
class OtpCodeException extends DomainException_exception_1.DomainException {
    constructor(message = "otp code invalid") {
        super(message);
    }
}
exports.OtpCodeException = OtpCodeException;
