"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandlordProfileStrategy = void 0;
const UserDateOfBirth_vo_1 = require("../../../Core/value-object/UserDateOfBirth.vo");
const UserName_vo_1 = require("../../../Core/value-object/UserName.vo");
const UserPhoneNumber_vo_1 = require("../../../Core/value-object/UserPhoneNumber.vo");
class LandlordProfileStrategy {
    constructor(landlordRep, passwordService, fileService) {
        this.landlordRep = landlordRep;
        this.passwordService = passwordService;
        this.fileService = fileService;
    }
    async UserProfile(userId) {
        const user = await this.landlordRep.findLandlordById(userId);
        if (!user)
            throw new Error("no user found !!");
        return {
            email: user.getUser().getEmail(),
            name: user.getUser().getName(),
            role: user.getUser().getRole(),
            dateOfBirth: user.getUser().getDateOfBirth(),
            phoneNumber: user.getUser().getPhoneNumber(),
            address: user.getUser().getAddress(),
            photo: user.getUser().getPhoto(),
            LandlordGovId: user.getGovId(),
            cliQAccount: user.getCliQAccount(),
        };
    }
    async UpdateUserProfile(userId, dto) {
        try {
            const user = await this.landlordRep.findLandlordById(userId);
            if (!user)
                throw new Error("no user found !!");
            if (dto.address)
                user.getUser().setAddress(dto.address);
            if (dto.dateOfBirth)
                user.getUser().updateDateOfBirth(new UserDateOfBirth_vo_1.UserDateOfBirth(dto.dateOfBirth));
            if (dto.name)
                user.getUser().updateName(new UserName_vo_1.UserName(dto.name));
            if (dto.phoneNumber)
                user.getUser().updatePhoneNumber(new UserPhoneNumber_vo_1.userPhoneNumber(dto.phoneNumber));
            if (dto.photo) {
                let photoDoc = await this.fileService.upload(dto.photo);
                user.getUser().setPhoto(photoDoc);
            }
            if (dto.newPassword && dto.oldPassword) {
                const validatePass = await this.passwordService.compare(dto.oldPassword, user.getUser().getPass());
                if (!validatePass)
                    throw new Error("old pass is not correct");
                const newPass = await this.passwordService.hash(dto.newPassword);
                if (await this.passwordService.compare(newPass, user.getUser().getPass()))
                    throw new Error("you use this password before");
            }
            if (dto.cliQAccount) {
                user.updateCliQAccount(dto.cliQAccount);
            }
            await this.landlordRep.updateLandlord(user);
            return {
                message: "landlord update profile successful ",
            };
        }
        catch (error) {
            console.error("error while updating profile !!", error);
            throw error;
        }
    }
}
exports.LandlordProfileStrategy = LandlordProfileStrategy;
