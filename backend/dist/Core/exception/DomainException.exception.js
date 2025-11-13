"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainException = void 0;
class DomainException extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = "DomainError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.DomainException = DomainException;
