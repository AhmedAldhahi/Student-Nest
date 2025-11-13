"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExictException = void 0;
const ApplicationError_error_1 = require("./ApplicationError.error");
class UserExictException extends ApplicationError_error_1.ApplicationError {
    constructor(message = "User is email is been used !!") {
        super(message);
    }
}
exports.UserExictException = UserExictException;
