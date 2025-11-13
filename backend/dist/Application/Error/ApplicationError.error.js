"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
class ApplicationError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = "ApplicatonError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.ApplicationError = ApplicationError;
