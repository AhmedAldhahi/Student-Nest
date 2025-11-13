"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterLandloardUseCase = void 0;
const UserExictException_error_1 = require("../Error/UserExictException.error");
const uuid_1 = require("uuid");
const OTP_ValueObject_1 = require("../../Core/value-object/OTP.ValueObject");
class RegisterLandloardUseCase {
    constructor(unitOfWork, passwordService, landloardBuilder, emailService) {
        this.unitOfWork = unitOfWork;
        this.passwordService = passwordService;
        this.landloardBuilder = landloardBuilder;
        this.emailService = emailService;
    }
    async execute(dto) {
        await this.unitOfWork.startTransaction();
        const otp = OTP_ValueObject_1.OTP.generate();
        try {
            const excitUser = await this.unitOfWork.LandloardReposotries.findByEmail(dto.email);
            if (excitUser) {
                throw new UserExictException_error_1.UserExictException();
            }
            const hashPassword = await this.passwordService.hash(dto.password);
            const generatedUserId = (0, uuid_1.v4)();
            const userBuilder = this.landloardBuilder
                .buildUserId(generatedUserId)
                .buildRole(dto.role)
                .buildEmail(dto.email)
                .buildName(dto.name)
                .buildDateOfBirth(dto.dateOfBirth)
                .buildPhoneNumber(dto.phoneNumber)
                .buildHash(hashPassword)
                .buildCliqAccount(dto.cliQAccount)
                .buildLandloardGovId(dto.LandloardGovId);
            if (dto.address) {
                userBuilder.buildAddress(dto.address);
            }
            if (!dto.LandloardGovId || !dto.cliQAccount) {
                throw new Error("Landlord  role requires 'cliQ' and 'Landlord Gov Id'.");
            }
            const user = userBuilder.build();
            user.setOtp(otp);
            await this.unitOfWork.LandloardReposotries.save(user);
            await this.emailService.sendRegistrationEmail(user.getEmail(), otp.getValue());
            await this.unitOfWork.commit();
            return {
                message: "user regster scussful! verfied you email otp ",
            };
        }
        catch (err) {
            let errorMessage = "An unknown error occurred";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            console.error("Failed to create user. Reason:", errorMessage);
            await this.unitOfWork.rollBack();
            throw err;
        }
    }
}
exports.RegisterLandloardUseCase = RegisterLandloardUseCase;
