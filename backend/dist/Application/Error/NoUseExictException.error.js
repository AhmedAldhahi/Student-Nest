"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoUserExistException = void 0;
const ApplicationError_error_1 = require("./ApplicationError.error");
class NoUserExistException extends ApplicationError_error_1.ApplicationError {
    constructor(message = "No user been found  !!") {
        super(message);
    }
}
exports.NoUserExistException = NoUserExistException;
