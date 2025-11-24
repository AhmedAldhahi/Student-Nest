"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GovernmentID = void 0;
class GovernmentID {
    constructor(id) {
        this.validate(id);
        this.value = id;
    }
    validate(id) {
        if (id.length !== 10) {
            throw new Error("user Government id number must contain 10 number ");
        }
        if (!/^\d+$/.test(id)) {
            throw new Error(" user Government id number must contain just number ");
        }
    }
    getValue() {
        return this.value;
    }
}
exports.GovernmentID = GovernmentID;
