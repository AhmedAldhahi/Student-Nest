"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentCardIdException = void 0;
const DomainException_exception_1 = require("./DomainException.exception");
class StudentCardIdException extends DomainException_exception_1.DomainException {
    constructor(message = "invalid student card Id !!") {
        super(message);
    }
}
exports.StudentCardIdException = StudentCardIdException;
