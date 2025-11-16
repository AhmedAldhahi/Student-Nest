"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const MajorException_exception_1 = require("../exception/MajorException.exception");
const UnversityException_exception_1 = require("../exception/UnversityException.exception");
const validationZod_constant_1 = require("../../Shared/constants/validationZod.constant");
const GraduateYear_exception_exception_1 = require("../exception/GraduateYear.exception.exception");
const StudentCardIdException_exception_1 = require("../exception/StudentCardIdException.exception");
const UserGovIdException_exception_1 = require("../exception/UserGovIdException.exception");
const UserRole_enum_1 = require("../enum/UserRole.enum");
const UserAccountStatus_enum_1 = require("../enum/UserAccountStatus.enum");
const PhonNumberException_exception_1 = require("../exception/PhonNumberException.exception");
const NameException_exception_1 = require("../exception/NameException.exception");
const EmailEsception_exception_1 = require("../exception/EmailEsception.exception");
const helperValue_constant_1 = require("../../Shared/constants/helperValue.constant");
class Student {
    constructor() {
        this.accountStatus = UserAccountStatus_enum_1.UserAccountStatus.activate;
        this.emailVerfied = false;
    }
    setValidateStudentDocument(validateStudentDocument) {
        if (!validateStudentDocument)
            throw new Error("validate document is required !!");
        this.validateStudentDocument = validateStudentDocument;
    }
    getValidateStudentDocument() {
        return this.validateStudentDocument;
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
        if (!userPass)
            throw new Error("userPass is required");
        this.hashPassword = userPass;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        if (!email)
            throw new Error("email is required");
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
        role = UserRole_enum_1.UserRole.student;
        this.role = role;
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
    getMajor() {
        return this.major;
    }
    getGraduateYear() {
        return this.graduatYear;
    }
    getUnverstiyName() {
        return this.unversityName;
    }
    getStudentCardId() {
        return this.studentCardId;
    }
    setMajor(studentMajor) {
        if (!studentMajor)
            throw new Error("studentMajor is required");
        const majorPattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
        if (!majorPattern.test(studentMajor.trim())) {
            throw new MajorException_exception_1.MajorException();
        }
        this.major = studentMajor.trim();
    }
    setUnversityName(unversityName) {
        if (!unversityName)
            throw new Error("unversityName is required");
        const UnversityPattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
        const trimmedName = unversityName.trim();
        if (!UnversityPattern.test(trimmedName)) {
            throw new UnversityException_exception_1.UnversityException();
        }
        this.unversityName = trimmedName;
    }
    setGraduateYear(studentGraduateYear) {
        const dob = Number.parseInt(this.getDateOfBirth());
        if (dob >= studentGraduateYear) {
            throw new Error("student can not graduate if before or year he born !!");
        }
        if (!studentGraduateYear)
            throw new Error("studentGraduateYear is required");
        if (studentGraduateYear < validationZod_constant_1.currentYear) {
            throw new GraduateYear_exception_exception_1.GraduatYearException();
        }
        if (studentGraduateYear > validationZod_constant_1.currentYear &&
            studentGraduateYear - validationZod_constant_1.currentYear > 8) {
            throw new GraduateYear_exception_exception_1.GraduatYearException("the user at most car graudate 8 year !!");
        }
        this.graduatYear = studentGraduateYear;
    }
    setstudentCardId(studentCardId) {
        if (!studentCardId)
            throw new Error("studentCardId is required");
        const trimmer = studentCardId.trim();
        if (trimmer.length < 8) {
            throw new StudentCardIdException_exception_1.StudentCardIdException();
        }
        this.studentCardId = trimmer;
    }
    setStudentGovId(studentGovId) {
        if (!studentGovId)
            throw new Error("studentGovId is required");
        const trimmer = studentGovId.trim();
        if (trimmer.length < 8) {
            throw new UserGovIdException_exception_1.UserGovIdException();
        }
        this.student_Gov_Id = studentGovId;
    }
    getStudentGovId() {
        return this.student_Gov_Id;
    }
}
exports.Student = Student;
