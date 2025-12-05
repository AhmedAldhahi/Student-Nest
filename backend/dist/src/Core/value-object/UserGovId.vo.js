"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GovernmentID = void 0;
class GovernmentID {
    constructor(id) {
        this.validate(id);
        this.value = id;
    }
    validate(id) {
        id = id.trim();
        if (id.startsWith("-")) {
            throw new Error("Negative numbers are not allowed.");
        }
        if (id.length === 0) {
            throw new Error("User Government ID cannot be empty.");
        }
        if (id.length !== 10) {
            throw new Error("User Government ID number must be exactly 10 digits.");
        }
        if (id.startsWith("0")) {
            throw new Error("User Government ID cannot start with a leading zero.");
        }
        if (!/^\d+$/.test(id)) {
            throw new Error("User Government ID number must contain only numeric digits.");
        }
    }
    getValue() {
        return this.value;
    }
}
exports.GovernmentID = GovernmentID;
