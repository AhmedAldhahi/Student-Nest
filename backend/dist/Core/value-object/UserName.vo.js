"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserName = void 0;
class UserName {
    constructor(userName) {
        this.userName = userName;
        if (!userName) {
            throw new Error("User name is required");
        }
        const trimmed = userName.trim();
        if (trimmed.length < 3) {
            throw new Error("User name is too short");
        }
        if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(trimmed)) {
            throw new Error("Name must start with a letter and can only contain letters, numbers, or underscores, no spaces allowed");
        }
    }
    getValue() {
        return this.userName;
    }
}
exports.UserName = UserName;
