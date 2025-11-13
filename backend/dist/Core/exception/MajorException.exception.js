"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MajorException = void 0;
const DomainException_exception_1 = require("./DomainException.exception");
class MajorException extends DomainException_exception_1.DomainException {
    constructor(message = "Invalid major: only letters and single spaces are allowed. No numbers or special characters") {
        super(message);
    }
}
exports.MajorException = MajorException;
