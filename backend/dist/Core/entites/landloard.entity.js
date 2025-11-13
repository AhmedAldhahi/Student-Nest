"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Landloard = void 0;
const helperValue_constant_1 = require("../../Shared/constants/helperValue.constant");
const UserAccountStatus_enum_1 = require("../enum/UserAccountStatus.enum");
const UserRole_enum_1 = require("../enum/UserRole.enum");
const EmailEsception_exception_1 = require("../exception/EmailEsception.exception");
const NameException_exception_1 = require("../exception/NameException.exception");
const PhonNumberException_exception_1 = require("../exception/PhonNumberException.exception");
const UserGovIdException_exception_1 = require("../exception/UserGovIdException.exception");
class Landloard {
    constructor() {
        this.accountStatus = UserAccountStatus_enum_1.UserAccountStatus.activate;
        this.emailVerfied = false;
    }
    setOtp(otp) {
        this.otpCode = otp.getValue();
        this.otpExpired = otp.getExpiresAt();
    }
    setOtpCode(code) {
        this.otpCode = code;
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
    setOtpExpired(date) {
        this.otpExpired = date || undefined;
    }
    clearOtp() {
        this.otpCode = undefined;
        this.otpExpired = undefined;
    }
    setCliQAccount(cliQ) {
        this.cliQAccount = cliQ;
    }
    setLandloardGovId(landloardGovId) {
        const trimmer = landloardGovId.trim();
        if (trimmer.length < 8) {
            throw new UserGovIdException_exception_1.UserGovIdException();
        }
        this.Landloard_Gov_Id = landloardGovId;
    }
    getcliQAccount() {
        return this.cliQAccount;
    }
    getLandloardGovId() {
        return this.Landloard_Gov_Id;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(userId) {
        if (!userId)
            throw new Error("user id is required");
        this.userId = userId;
    }
    getDateOfBirth() {
        return this.dateOfBirth;
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
    getPassword() {
        return this.hashPassword;
    }
    setPass(userPass) {
        this.hashPassword = userPass;
    }
    getEmail() {
        return this.email;
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
    getName() {
        return this.name;
    }
    getRole() {
        return this.role;
    }
    setRole(role) {
        role = UserRole_enum_1.UserRole.landloard;
        this.role = UserRole_enum_1.UserRole.landloard;
    }
    getPhoeNumber() {
        return this.phoneNumber;
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
    getAddress() {
        return this.address;
    }
    setAddress(userAddress) {
        this.address = userAddress;
    }
    getPhoto() {
        return this.photo;
    }
    setPhoto(photoUrl) {
        this.photo = photoUrl;
    }
    getVerfiedEmail() {
        return this.emailVerfied;
    }
    setVerfiedEmail() {
        this.emailVerfied = true;
    }
    ActiveteAccount() {
        this.accountStatus = UserAccountStatus_enum_1.UserAccountStatus.activate;
    }
    DeactivateAccount() {
        this.accountStatus = UserAccountStatus_enum_1.UserAccountStatus.deactivate;
    }
    bandedAccount() {
        this.accountStatus = UserAccountStatus_enum_1.UserAccountStatus.banded;
    }
    getAccountStatus() {
        return this.accountStatus;
    }
    setAccountStatus(status) {
        this.accountStatus = status;
    }
}
exports.Landloard = Landloard;
