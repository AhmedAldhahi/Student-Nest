"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const userEntity_entity_1 = require("../../Core/entites/userEntity.entity");
const OTP_vo_1 = require("../../Core/value-object/OTP.vo");
const UserDateOfBirth_vo_1 = require("../../Core/value-object/UserDateOfBirth.vo");
const UserEmail_vo_1 = require("../../Core/value-object/UserEmail.vo");
const UserName_vo_1 = require("../../Core/value-object/UserName.vo");
const UserPhoneNumber_vo_1 = require("../../Core/value-object/UserPhoneNumber.vo");
const User_entity_1 = require("../database/orm/TypeOrm/entity/User.entity");
class UserMapper {
    static toOrm(user) {
        const userModel = new User_entity_1.UserModel();
        userModel.userId = user.getUserId();
        userModel.Name = user.getName();
        userModel.DateOfBirth = user.getDateOfBirth();
        userModel.Email = user.getEmail();
        userModel.Role = user.getRole();
        userModel.Password = user.getPass();
        userModel.PhoneNumber = user.getPhoneNumber();
        userModel.otpCode = user.getOtpForEmail() ?? null;
        userModel.otpExpired = user.getOtpExpiredForEmail() ?? null;
        userModel.emailVerfied = user.getVerifiedEmail();
        userModel.OtpResetPasswordCode = user.getOTPForResetPassword() ?? null;
        userModel.OtpExpiredResetPassword =
            user.getOTPExpiredDateForResetPassword() ?? null;
        userModel.resetPasswordVerified = user.getVerifiedResetPassword();
        userModel.Address = user.getAddress();
        userModel.Photo = user.getPhoto();
        return userModel;
    }
    static toEntity(user) {
        const userEntity = new userEntity_entity_1.UserEntity({
            userId: user.userId,
            name: new UserName_vo_1.UserName(user.Name),
            dateOfBirth: new UserDateOfBirth_vo_1.UserDateOfBirth(user.DateOfBirth),
            email: new UserEmail_vo_1.UserEmail(user.Email),
            role: user.Role,
            password: user.Password,
            phoneNumber: new UserPhoneNumber_vo_1.userPhoneNumber(user.PhoneNumber),
            address: user.Address,
            photo: user.Photo,
        });
        if (user.otpCode) {
            userEntity.setOtpForEmail(new OTP_vo_1.OTP(user.otpCode));
        }
        if (user.OtpResetPasswordCode) {
            userEntity.setOTPForResetPassword(new OTP_vo_1.OTP(user.OtpResetPasswordCode));
        }
        if (user.emailVerfied) {
            userEntity.verifiedEmail();
        }
        if (user.resetPasswordVerified) {
            userEntity.verifyResetPassword();
        }
        return userEntity;
    }
}
exports.UserMapper = UserMapper;
