"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileData = getUserProfileData;
exports.updateUserProfile = updateUserProfile;
const GetUserProfileData_usecase_1 = require("../../Application/use-case/profile/GetUserProfileData.usecase");
const updateUserProfileData_usecase_1 = require("../../Application/use-case/profile/updateUserProfileData.usecase");
const unitOfWork_repositories_1 = require("../repositories/unitOfWork.repositories");
const BcryptPasswordHasher_service_1 = require("../services/security/BcryptPasswordHasher.service");
const CloudinaryService_service_1 = require("../services/media/CloudinaryService.service");
function getUserProfileData() {
    const userRepo = new unitOfWork_repositories_1.UnitOfWork();
    return new GetUserProfileData_usecase_1.UserProfileDataUseCase(userRepo);
}
function updateUserProfile() {
    const userRepo = new unitOfWork_repositories_1.UnitOfWork();
    const passService = new BcryptPasswordHasher_service_1.BcryptPasswordHasher();
    const fileService = new CloudinaryService_service_1.CloudinaryService();
    return new updateUserProfileData_usecase_1.updateUserProfileDataUseCase(userRepo, passService, fileService);
}
