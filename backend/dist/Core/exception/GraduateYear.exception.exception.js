"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraduatYearException = void 0;
const DomainException_exception_1 = require("./DomainException.exception");
class GraduatYearException extends DomainException_exception_1.DomainException {
    constructor(message = "invalid graduate year !!") {
        super(message);
    }
}
exports.GraduatYearException = GraduatYearException;
