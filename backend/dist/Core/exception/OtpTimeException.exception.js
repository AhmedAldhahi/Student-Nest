"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpTimeException = void 0;
const DomainException_exception_1 = require("./DomainException.exception");
class OtpTimeException extends DomainException_exception_1.DomainException {
    constructor(message = "invalid otp code time") {
        super(message);
    }
}
exports.OtpTimeException = OtpTimeException;
