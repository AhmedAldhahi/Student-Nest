"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnversityException = void 0;
const DomainException_exception_1 = require("./DomainException.exception");
class UnversityException extends DomainException_exception_1.DomainException {
    constructor(message = "Invalid Unversity: only letters and single spaces are allowed. No numbers or special characters") {
        super(message);
    }
}
exports.UnversityException = UnversityException;
