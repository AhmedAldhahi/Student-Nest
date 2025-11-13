"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailFormateException = void 0;
const DomainException_exception_1 = require("./DomainException.exception");
class EmailFormateException extends DomainException_exception_1.DomainException {
    constructor(message = "invalid Student email formate !!") {
        super(message);
    }
}
exports.EmailFormateException = EmailFormateException;
