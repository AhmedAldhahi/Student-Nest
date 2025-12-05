"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandlordEntity = void 0;
class LandlordEntity {
    constructor(data) {
        this.user = data.user;
        this.cliQAccount = data.cliQAccount;
        this.landlordGovId = data.landlordGovId;
    }
    getUserId() {
        return this.user.getUserId();
    }
    getGovId() {
        return this.landlordGovId.getValue();
    }
    updateCliQAccount(cliQ) {
        this.cliQAccount = cliQ;
    }
    getCliQAccount() {
        return this.cliQAccount;
    }
    getUser() {
        return this.user;
    }
}
exports.LandlordEntity = LandlordEntity;
