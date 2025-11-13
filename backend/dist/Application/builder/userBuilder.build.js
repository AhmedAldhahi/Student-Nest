"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBuilder = void 0;
const user_entity_1 = require("../../Core/entites/user.entity");
class UserBuilder {
    constructor() {
        this.user = new user_entity_1.User();
    }
    build() {
        if (!this.user.getUserId() ||
            !this.user.getPassword() ||
            !this.user.getEmail() ||
            !this.user.getName() ||
            !this.user.getRole() ||
            !this.user.getDateOfBirth() ||
            !this.user.getPhoeNumber()) {
            throw new Error("Missing required properties to build User.");
        }
        return this.user;
    }
    buildAddress(userAddress) {
        this.user.setAddress(userAddress);
        return this;
    }
    buildDateOfBirth(userBirth) {
        this.user.setDateOfBirth(userBirth);
        return this;
    }
    buildEmail(userEmail) {
        this.user.setEmail(userEmail);
        return this;
    }
    buildHash(userPass) {
        this.user.setPass(userPass);
        return this;
    }
    buildName(userName) {
        this.user.setName(userName);
        return this;
    }
    buildPhoneNumber(userPhone) {
        this.user.setPhoneNumber(userPhone);
        return this;
    }
    buildRole(userRole) {
        this.user.setRole(userRole);
        return this;
    }
    buildUserId(userId) {
        this.user.setUserId(userId);
        return this;
    }
}
exports.UserBuilder = UserBuilder;
