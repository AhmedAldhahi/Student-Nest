"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGovIdException = void 0;
const DomainException_exception_1 = require("./DomainException.exception");
class UserGovIdException extends DomainException_exception_1.DomainException {
    constructor(message = "Invalid Goverment id exception !!") {
        super(message);
    }
}
exports.UserGovIdException = UserGovIdException;
