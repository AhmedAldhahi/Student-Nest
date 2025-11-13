"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordBeenUsedBeforeException = void 0;
const ApplicationError_error_1 = require("./ApplicationError.error");
class PasswordBeenUsedBeforeException extends ApplicationError_error_1.ApplicationError {
    constructor(message = "you choice this pass before try another one !!") {
        super(message);
    }
}
exports.PasswordBeenUsedBeforeException = PasswordBeenUsedBeforeException;
