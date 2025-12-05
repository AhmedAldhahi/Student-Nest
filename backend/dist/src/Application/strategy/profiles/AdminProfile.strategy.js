"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminProfileStrategy = void 0;
const UserDateOfBirth_vo_1 = require("../../../Core/value-object/UserDateOfBirth.vo");
const UserName_vo_1 = require("../../../Core/value-object/UserName.vo");
const UserPhoneNumber_vo_1 = require("../../../Core/value-object/UserPhoneNumber.vo");
class AdminProfileStrategy {
    constructor(userRep, passworderService, fileService) {
        this.userRep = userRep;
        this.passworderService = passworderService;
        this.fileService = fileService;
    }
    async UserProfile(userId) {
        const user = await this.userRep.findById(userId);
        if (!user)
            throw new Error("no user");
        return {
            email: user.getEmail(),
            name: user.getName(),
            role: user.getRole(),
            dateOfBirth: user.getDateOfBirth(),
            phoneNumber: user.getPhoneNumber(),
            address: user.getAddress(),
            photo: user.getPhoto(),
        };
    }
    async UpdateUserProfile(userId, dto) {
        try {
            const user = await this.userRep.findById(userId);
            if (!user)
                throw new Error("no user found !!");
            if (dto.address)
                user.setAddress(dto.address);
            if (dto.dateOfBirth)
                user.updateDateOfBirth(new UserDateOfBirth_vo_1.UserDateOfBirth(dto.dateOfBirth));
            if (dto.name)
                user.updateName(new UserName_vo_1.UserName(dto.name));
            if (dto.phoneNumber)
                user.updatePhoneNumber(new UserPhoneNumber_vo_1.userPhoneNumber(dto.phoneNumber));
            if (dto.photo) {
                let photoDoc = await this.fileService.upload(dto.photo);
                user.setPhoto(photoDoc);
            }
            if (dto.newPassword && dto.oldPassword) {
                const validatePass = await this.passworderService.compare(dto.oldPassword, user.getPass());
                if (!validatePass)
                    throw new Error("old pass is not correct");
                const newPass = await this.passworderService.hash(dto.newPassword);
                if (await this.passworderService.compare(newPass, user.getPass()))
                    throw new Error("you use this password before");
                user.setPassword(newPass);
            }
            await this.userRep.updateUser(user);
            return {
                message: "Admin profile updated successfully",
            };
        }
        catch (error) {
            console.error("Error updating profile:", error.message);
            throw error;
        }
    }
}
exports.AdminProfileStrategy = AdminProfileStrategy;
