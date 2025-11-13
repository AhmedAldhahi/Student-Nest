"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenServiceError = void 0;
class TokenServiceError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'Email Service Error';
    }
}
exports.TokenServiceError = TokenServiceError;
