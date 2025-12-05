"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDateOfBirth = void 0;
const helperValue_constant_1 = require("../../Shared/constants/helperValue.constant");
class UserDateOfBirth {
    constructor(value) {
        this.value = value;
        if (!value)
            throw new Error("date of birth is required");
        const Dob = Number.parseInt(value);
        if (Number.isNaN(Dob))
            throw new Error("the date of birth must be number");
        if (helperValue_constant_1.defaultYear - Dob < 18) {
            throw new Error("the User must be at least 18 !!");
        }
    }
    getValue() {
        return this.value;
    }
}
exports.UserDateOfBirth = UserDateOfBirth;
