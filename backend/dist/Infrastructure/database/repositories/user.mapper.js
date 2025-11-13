"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const user_entity_1 = require("../../../Core/entites/user.entity");
const User_entity_1 = require("../orm/TypeOrm/entity/User.entity");
class UserMapper {
    static toDomain(dbUser) {
        const domainUser = new user_entity_1.User();
        domainUser.setUserId(dbUser.userId);
        domainUser.setName(dbUser.Name);
        domainUser.setEmail(dbUser.Email);
        domainUser.setPass(dbUser.Password);
        domainUser.setRole(dbUser.Role);
        domainUser.setDateOfBirth(dbUser.DateOfBirth);
        domainUser.setPhoneNumber(dbUser.PhoneNumber);
        domainUser.setEmailVerfiedStatus(dbUser.emailVerfied);
        if (dbUser.otpCode) {
            domainUser.setOtpCode(dbUser.otpCode);
        }
        if (dbUser.otpExpired) {
            domainUser.setOtpExpired(dbUser.otpExpired);
        }
        if (dbUser.Photo) {
            domainUser.setPhoto(dbUser.Photo);
        }
        if (dbUser.Address) {
            domainUser.setAddress(dbUser.Address);
        }
        domainUser.setAccountStatus(dbUser.isActive);
        return domainUser;
    }
    static toPersistence(domainUser) {
        const dbUser = new User_entity_1.User();
        dbUser.userId = domainUser.getUserId();
        dbUser.Name = domainUser.getName();
        dbUser.Email = domainUser.getEmail();
        dbUser.Password = domainUser.getPassword();
        dbUser.Role = domainUser.getRole();
        dbUser.DateOfBirth = domainUser.getDateOfBirth();
        dbUser.PhoneNumber = domainUser.getPhoeNumber();
        dbUser.emailVerfied = domainUser.getVerfiedEmail();
        dbUser.isActive = domainUser.getAccountStatus();
        dbUser.Photo = domainUser.getPhoto();
        dbUser.Address = domainUser.getAddress();
        dbUser.otpCode = domainUser.getOtpCodeRaw() ?? null;
        dbUser.otpExpired = domainUser.getOtpExpiredRaw() ?? null;
        return dbUser;
    }
}
exports.UserMapper = UserMapper;
