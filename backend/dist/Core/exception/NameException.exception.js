"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameException = void 0;
const DomainException_exception_1 = require("./DomainException.exception");
class NameException extends DomainException_exception_1.DomainException {
    constructor(message = "User name is required") {
        super(message);
    }
}
exports.NameException = NameException;
