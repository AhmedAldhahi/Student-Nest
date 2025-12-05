"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfileDataUseCase = void 0;
const AdminProfile_strategy_1 = require("../../strategy/profiles/AdminProfile.strategy");
const LandlordProfile_strategy_1 = require("../../strategy/profiles/LandlordProfile.strategy");
const StudentProfile_strategy_1 = require("../../strategy/profiles/StudentProfile.strategy");
class updateUserProfileDataUseCase {
    constructor(unitOfWork, passwordService, fileService) {
        this.unitOfWork = unitOfWork;
        this.passwordService = passwordService;
        this.fileService = fileService;
    }
    async execute(userId, dto) {
        try {
            await this.unitOfWork.startTransaction();
            const user = await this.unitOfWork.userRepo.findById(userId);
            if (!user)
                throw new Error("no user found !!");
            switch (user.getRole()) {
                case "admin":
                    this.profileStrategy = new AdminProfile_strategy_1.AdminProfileStrategy(this.unitOfWork.userRepo, this.passwordService, this.fileService);
                    break;
                case "landloard":
                    this.profileStrategy = new LandlordProfile_strategy_1.LandlordProfileStrategy(this.unitOfWork.landlordRepo, this.passwordService, this.fileService);
                    break;
                case "student":
                    this.profileStrategy = new StudentProfile_strategy_1.StudentProfileStrategy(this.unitOfWork.studentRepo, this.passwordService, this.fileService);
                    break;
                default:
                    await this.unitOfWork.rollbackTransaction();
                    throw new Error("invalid role !!");
            }
            const profile = await this.profileStrategy.UpdateUserProfile(userId, dto);
            await this.unitOfWork.commitTransaction();
            return profile;
        }
        catch (error) {
            await this.unitOfWork.rollbackTransaction();
            throw error;
        }
    }
}
exports.updateUserProfileDataUseCase = updateUserProfileDataUseCase;
