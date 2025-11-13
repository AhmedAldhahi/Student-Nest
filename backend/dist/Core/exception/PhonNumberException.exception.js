"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneNumberFormateException = void 0;
const DomainException_exception_1 = require("./DomainException.exception");
class phoneNumberFormateException extends DomainException_exception_1.DomainException {
    constructor(message = "Invalid phone number. Use international format (+[countrycode][number]) or Jordanian format (+9627XXXXXXXX, 009627XXXXXXXX, 07XXXXXXXX).") {
        super(message);
    }
}
exports.phoneNumberFormateException = phoneNumberFormateException;
