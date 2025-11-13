"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailServiceError = void 0;
class EmailServiceError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'Email Service Error';
    }
}
exports.EmailServiceError = EmailServiceError;
