"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const UserAccountStatus_enum_1 = require("../enum/UserAccountStatus.enum");
class UserEntity {
    constructor(data) {
        this.accountStats = UserAccountStatus_enum_1.UserAccountStatus.activate;
        this.emailVerified = false;
        this.resetPasswordVerified = false;
        this.userId = data.userId;
        this.password = data.password;
        this.name = data.name;
        this.dateOfBirth = data.dateOfBirth;
        this.phoneNumber = data.phoneNumber;
        this.email = data.email;
        this.role = data.role;
        this.address = data.address ?? undefined;
        this.photo = data.photo ?? undefined;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    getUserId() {
        return this.userId;
    }
    updateEmail(userEmail) {
        this.email = userEmail;
    }
    getEmail() {
        return this.email.getValue();
    }
    resetVerifiedEmail() {
        this.emailVerified = false;
    }
    verifiedEmail() {
        this.emailVerified = true;
    }
    getVerifiedEmail() {
        return this.emailVerified;
    }
    setOtpForEmail(otp) {
        this.emailOTP = otp;
    }
    getOtpForEmail() {
        return this.emailOTP?.getValue();
    }
    getOtpExpiredForEmail() {
        return this.emailOTP?.getExpiresAt();
    }
    verifiedEmailOTP(clientOTP) {
        if (this.emailVerified)
            throw new Error("Email already verified.");
        if (!this.emailOTP)
            throw new Error("No OTP set for email verification.");
        if (new Date() > this.emailOTP.getExpiresAt())
            throw new Error("OTP expired.");
        const verified = this.emailOTP.verfiedOtp(clientOTP);
        if (!verified)
            throw new Error("Invalid OTP code.");
        this.emailVerified = true;
        this.clearEmailOTP();
    }
    clearEmailOTP() {
        this.emailOTP = null;
    }
    resetVerifiedPassword() {
        this.resetPasswordVerified = false;
    }
    verifyResetPassword() {
        this.resetPasswordVerified = true;
    }
    getVerifiedResetPassword() {
        return this.resetPasswordVerified;
    }
    setOTPForResetPassword(otp) {
        this.resetPasswordOTP = otp;
    }
    getOTPForResetPassword() {
        return this.resetPasswordOTP?.getValue();
    }
    getOTPExpiredDateForResetPassword() {
        return this.resetPasswordOTP?.getExpiresAt();
    }
    verifiedResetPasswordOTP(clientOTP) {
        if (this.resetPasswordVerified)
            throw new Error("reset password been verified !!");
        if (!this.resetPasswordOTP)
            throw new Error("no otp been reset !!");
        if (new Date() > this.resetPasswordOTP.getExpiresAt())
            throw new Error("otp expired !!");
        const verified = this.resetPasswordOTP.verfiedOtp(clientOTP);
        if (!verified)
            throw new Error("invalid otp !!");
        if (this.resetPasswordVerified)
            throw new Error("the user email is already verified ");
        this.resetPasswordVerified = true;
        this.clearResetPasswordOTP();
    }
    clearResetPasswordOTP() {
        this.resetPasswordOTP = null;
    }
    updateName(userName) {
        this.name = userName;
    }
    getName() {
        return this.name.getValue();
    }
    setPassword(userPass) {
        this.password = userPass;
    }
    getPass() {
        return this.password;
    }
    updateDateOfBirth(userDOB) {
        this.dateOfBirth = userDOB;
    }
    getDateOfBirth() {
        return this.dateOfBirth.getValue();
    }
    updatePhoneNumber(userPhoneNumber) {
        this.phoneNumber = userPhoneNumber;
    }
    getPhoneNumber() {
        return this.phoneNumber.getValue();
    }
    setPhoto(photo) {
        this.photo = photo;
    }
    getPhoto() {
        return this.photo;
    }
    setAddress(address) {
        this.address = address;
    }
    getAddress() {
        return this.address;
    }
    setRole(userRole) {
        this.role = userRole;
    }
    getRole() {
        return this.role;
    }
    setAccountStatus(accountStatus) {
        this.accountStats = accountStatus;
    }
    getAccountStatus() {
        return this.accountStats;
    }
    bandedAccount() {
        this.accountStats = UserAccountStatus_enum_1.UserAccountStatus.banded;
    }
    disActivatedAccount() {
        this.accountStats = UserAccountStatus_enum_1.UserAccountStatus.deactivate;
    }
    activatedAccount() {
        this.accountStats = UserAccountStatus_enum_1.UserAccountStatus.activate;
    }
}
exports.UserEntity = UserEntity;
