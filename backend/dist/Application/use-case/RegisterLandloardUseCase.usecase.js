"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterLandloardUseCase = void 0;
const uuid_1 = require("uuid");
const OTP_vo_1 = require("../../Core/value-object/OTP.vo");
const userEntity_entity_1 = require("../../Core/entites/userEntity.entity");
const UserName_vo_1 = require("../../Core/value-object/UserName.vo");
const UserDateOfBirth_vo_1 = require("../../Core/value-object/UserDateOfBirth.vo");
const UserPhoneNumber_vo_1 = require("../../Core/value-object/UserPhoneNumber.vo");
const UserEmail_vo_1 = require("../../Core/value-object/UserEmail.vo");
const UserRole_enum_1 = require("../../Core/enum/UserRole.enum");
const landloardEntity_entity_1 = require("../../Core/entites/landloardEntity.entity");
const UserGovId_vo_1 = require("../../Core/value-object/UserGovId.vo");
class RegisterLandloardUseCase {
    constructor(unitOfWork, passwordService, emailService) {
        this.unitOfWork = unitOfWork;
        this.passwordService = passwordService;
        this.emailService = emailService;
    }
    async execute(dto) {
        const otp = OTP_vo_1.OTP.generate();
        const userId = (0, uuid_1.v4)();
        const hashedPassword = await this.passwordService.hash(dto.password);
        const user = new userEntity_entity_1.UserEntity({
            userId: userId,
            password: hashedPassword,
            name: new UserName_vo_1.UserName(dto.name),
            dateOfBirth: new UserDateOfBirth_vo_1.UserDateOfBirth(dto.dateOfBirth),
            phoneNumber: new UserPhoneNumber_vo_1.userPhoneNumber(dto.phoneNumber),
            email: new UserEmail_vo_1.UserEmail(dto.email),
            role: UserRole_enum_1.UserRole.landloard,
            address: dto.address,
        });
        user.setOtpForEmail(otp);
        const landlord = new landloardEntity_entity_1.LandlordEntity({
            user: user,
            cliQAccount: dto.cliQAccount,
            landlordGovId: new UserGovId_vo_1.GovernmentID(dto.LandloardGovId),
        });
        await this.unitOfWork.startTransaction();
        try {
            const foundUser = await this.unitOfWork.userRepo.findByEmail(dto.email);
            if (foundUser)
                throw new Error("user with this email already exist");
            await this.unitOfWork.userRepo.addNewUser(user);
            await this.unitOfWork.landlordRepo.createNewLandlord(landlord);
            await this.unitOfWork.commitTransaction();
        }
        catch (err) {
            await this.unitOfWork.rollbackTransaction();
            console.log("Failed to register landlord!!", err);
            throw err;
        }
        finally {
            await this.unitOfWork.releaseTransaction();
        }
        try {
            await this.emailService.sendRegistrationEmail(user.getEmail(), otp.getValue());
        }
        catch (emailErr) {
            console.log("email service failed!!", emailErr);
        }
        return {
            message: "Landlord registered successfully! Verify your email with the OTP.",
        };
    }
}
exports.RegisterLandloardUseCase = RegisterLandloardUseCase;
