"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const NameException_exception_1 = require("../exception/NameException.exception");
const UserAccountStatus_enum_1 = require("../enum/UserAccountStatus.enum");
const EmailEsception_exception_1 = require("../exception/EmailEsception.exception");
const PhonNumberException_exception_1 = require("../exception/PhonNumberException.exception");
const helperValue_constant_1 = require("../../Shared/constants/helperValue.constant");
class User {
    constructor() {
        this.accountStatus = UserAccountStatus_enum_1.UserAccountStatus.activate;
        this.emailVerfied = false;
    }
    ActiveteAccount() {
        this.accountStatus = UserAccountStatus_enum_1.UserAccountStatus.activate;
    }
    bandedAccount() {
        this.accountStatus = UserAccountStatus_enum_1.UserAccountStatus.banded;
    }
    clearOtp() {
        this.otpCode = null;
        this.otpExpired = null;
    }
    DeactivateAccount() {
        this.accountStatus = UserAccountStatus_enum_1.UserAccountStatus.deactivate;
    }
    getAccountStatus() {
        return this.accountStatus;
    }
    getAddress() {
        return this.address;
    }
    getDateOfBirth() {
        return this.dateOfBirth;
    }
    getEmail() {
        return this.email;
    }
    getName() {
        return this.name;
    }
    getOtpCode() {
        if (!this.otpCode)
            throw new Error("no otp been found!");
        return this.otpCode;
    }
    getOtpExpired() {
        if (!this.otpExpired)
            throw new Error("no otp expired found !");
        return this.otpExpired;
    }
    getOtpCodeRaw() {
        return this.otpCode;
    }
    getOtpExpiredRaw() {
        return this.otpExpired;
    }
    hasOtpCode() {
        return !!this.otpCode;
    }
    getPassword() {
        return this.password;
    }
    getPhoeNumber() {
        return this.phoneNumber;
    }
    getPhoto() {
        return this.photo;
    }
    getRole() {
        return this.role;
    }
    getUserId() {
        return this.userId;
    }
    getVerfiedEmail() {
        return this.emailVerfied;
    }
    setAccountStatus(status) {
        this.accountStatus = status;
    }
    setAddress(userAddress) {
        this.address = userAddress;
    }
    setDateOfBirth(dob) {
        if (!dob)
            throw new Error("date of birth is required");
        const Dob = Number.parseInt(dob);
        if (Number.isNaN(Dob))
            throw new Error("the date of birth must be number");
        if (helperValue_constant_1.defaultYear - Dob < 18) {
            throw new Error("the student must be at least 18 !!");
        }
        this.dateOfBirth = dob;
    }
    setEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email) || email.trim().length < 10) {
            throw new EmailEsception_exception_1.EmailFormateException("A valid email is required.");
        }
        this.email = email;
    }
    setName(userName) {
        if (!userName) {
            throw new NameException_exception_1.NameException("User name is required");
        }
        const trimmed = userName.trim();
        if (trimmed.toString().length < 3) {
            throw new NameException_exception_1.NameException("user name is too short");
        }
        if (/\s/.test(trimmed)) {
            throw new NameException_exception_1.NameException("Name cannot contain spaces");
        }
        if (!/^[A-Za-z]/.test(trimmed)) {
            throw new NameException_exception_1.NameException("Name must start with a letter");
        }
        if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(trimmed)) {
            throw new NameException_exception_1.NameException("Name can only contain letters, numbers, or underscores");
        }
        this.name = trimmed;
    }
    setOtp(otp) {
        this.otpCode = otp.getValue();
        this.otpExpired = otp.getExpiresAt();
    }
    setOtpCode(code) {
        this.otpCode = code || undefined;
    }
    setOtpExpired(date) {
        this.otpExpired = date || undefined;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    setVerfiedEmail() {
        this.emailVerfied = true;
    }
    setEmailVerfiedStatus(isVerified) {
        this.emailVerfied = isVerified;
    }
    setPass(userPass) {
        this.password = userPass;
    }
    setRole(role) {
        this.role = role;
    }
    setPhoneNumber(phone) {
        if (!phone)
            throw new Error("Phone number is required");
        const trimmed = phone.trim();
        const globalPhoneRegex = /^(?:\+?[1-9]\d{1,14}|(?:\+9627|009627|07)([7-9][0-9]{7}))$/;
        if (!globalPhoneRegex.test(trimmed)) {
            throw new PhonNumberException_exception_1.phoneNumberFormateException();
        }
        this.phoneNumber = trimmed;
    }
    setPhoto(photoUrl) {
        this.photo = photoUrl;
    }
}
exports.User = User;
