"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandlordMapper = void 0;
const landloard_entity_1 = require("../../../Core/entites/landloard.entity");
const Landloard_entity_1 = require("../orm/TypeOrm/entity/Landloard.entity");
const User_entity_1 = require("../orm/TypeOrm/entity/User.entity");
class LandlordMapper {
    static toDomain(dbLandlord) {
        const domainLandlord = new landloard_entity_1.Landloard();
        if (dbLandlord.user) {
            domainLandlord.setUserId(dbLandlord.user.userId);
            domainLandlord.setName(dbLandlord.user.Name);
            domainLandlord.setEmail(dbLandlord.user.Email);
            domainLandlord.setPass(dbLandlord.user.Password);
            domainLandlord.setRole(dbLandlord.user.Role);
            domainLandlord.setDateOfBirth(dbLandlord.user.DateOfBirth);
            domainLandlord.setPhoneNumber(dbLandlord.user.PhoneNumber);
            domainLandlord.setAccountStatus(dbLandlord.user.isActive);
            if (dbLandlord.user.otpCode) {
                domainLandlord.setOtpCode(dbLandlord.user.otpCode);
            }
            if (dbLandlord.user.otpExpired) {
                domainLandlord.setOtpExpired(dbLandlord.user.otpExpired);
            }
            if (dbLandlord.user.Photo) {
                domainLandlord.setPhoto(dbLandlord.user.Photo);
            }
            if (dbLandlord.user.Address) {
                domainLandlord.setAddress(dbLandlord.user.Address);
            }
        }
        domainLandlord.setCliQAccount(dbLandlord.cliQAccount);
        domainLandlord.setLandloardGovId(dbLandlord.landloardGovId);
        return domainLandlord;
    }
    static toPersistence(domainLandlord) {
        const dbUser = new User_entity_1.User();
        dbUser.userId = domainLandlord.getUserId();
        dbUser.Name = domainLandlord.getName();
        dbUser.Email = domainLandlord.getEmail();
        dbUser.Password = domainLandlord.getPassword();
        dbUser.Role = domainLandlord.getRole();
        dbUser.DateOfBirth = domainLandlord.getDateOfBirth();
        dbUser.PhoneNumber = domainLandlord.getPhoeNumber();
        dbUser.isActive = domainLandlord.getAccountStatus();
        dbUser.emailVerfied = domainLandlord.getVerfiedEmail();
        dbUser.Photo = domainLandlord.getPhoto();
        dbUser.Address = domainLandlord.getAddress();
        dbUser.otpCode = domainLandlord.getOtpCode();
        dbUser.otpExpired = domainLandlord.getOtpExpired();
        const dbLandlord = new Landloard_entity_1.Landlord();
        dbLandlord.cliQAccount = domainLandlord.getcliQAccount();
        dbLandlord.landloardGovId = domainLandlord.getLandloardGovId();
        dbLandlord.user = dbUser;
        return dbLandlord;
    }
}
exports.LandlordMapper = LandlordMapper;
