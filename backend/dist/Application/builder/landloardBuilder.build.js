"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandloardBuilder = void 0;
const landloard_entity_1 = require("../../Core/entites/landloard.entity");
class LandloardBuilder {
    constructor() {
        this.landloard = new landloard_entity_1.Landloard();
    }
    build() {
        if (!this.landloard.getUserId() ||
            !this.landloard.getPassword() ||
            !this.landloard.getEmail() ||
            !this.landloard.getName() ||
            !this.landloard.getRole() ||
            !this.landloard.getDateOfBirth() ||
            !this.landloard.getPhoeNumber() ||
            !this.landloard.getcliQAccount() ||
            !this.landloard.getLandloardGovId()) {
            throw new Error("Missing required properties to build User.");
        }
        return this.landloard;
    }
    buildAddress(userAddress) {
        this.landloard.setAddress(userAddress);
        return this;
    }
    buildCliqAccount(landloardCliq) {
        this.landloard.setCliQAccount(landloardCliq);
        return this;
    }
    buildDateOfBirth(userBirth) {
        this.landloard.setDateOfBirth(userBirth);
        return this;
    }
    buildEmail(userEmail) {
        this.landloard.setEmail(userEmail);
        return this;
    }
    buildHash(userPass) {
        this.landloard.setPass(userPass);
        return this;
    }
    buildLandloardGovId(landloardGovId) {
        this.landloard.setLandloardGovId(landloardGovId);
        return this;
    }
    buildName(userName) {
        this.landloard.setName(userName);
        return this;
    }
    buildPhoneNumber(userPhone) {
        this.landloard.setPhoneNumber(userPhone);
        return this;
    }
    buildRole(userRole) {
        this.landloard.setRole(userRole);
        return this;
    }
    buildUserId(userId) {
        this.landloard.setUserId(userId);
        return this;
    }
}
exports.LandloardBuilder = LandloardBuilder;
