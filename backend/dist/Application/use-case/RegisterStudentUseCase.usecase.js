"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterStudentUseCase = void 0;
const UserExictException_error_1 = require("../Error/UserExictException.error");
const OTP_ValueObject_1 = require("../../Core/value-object/OTP.ValueObject");
const uuid_1 = require("uuid");
class RegisterStudentUseCase {
    constructor(unitOfWork, passwordService, studentBuilder, emailService) {
        this.unitOfWork = unitOfWork;
        this.passwordService = passwordService;
        this.studentBuilder = studentBuilder;
        this.emailService = emailService;
    }
    async execute(dto) {
        await this.unitOfWork.startTransaction();
        const otp = OTP_ValueObject_1.OTP.generate();
        try {
            const excitUser = await this.unitOfWork.StudentRepostoies.findByEmail(dto.email);
            if (excitUser) {
                throw new UserExictException_error_1.UserExictException();
            }
            const hashPassword = await this.passwordService.hash(dto.password);
            const generatedUserId = (0, uuid_1.v4)();
            const studentBuilder = this.studentBuilder
                .buildUserId(generatedUserId)
                .buildRole(dto.role)
                .buildEmail(dto.email)
                .buildName(dto.name)
                .buildDateOfBirth(dto.dateOfBirth)
                .buildPhoneNumber(dto.phoneNumber)
                .buildHash(hashPassword)
                .buildMajor(dto.major)
                .buildUnversityName(dto.unversityName)
                .buildGraduateYear(dto.graduatYear)
                .buildStudentCardId(dto.studentCardId)
                .buildStudentGovId(dto.studentGovId);
            if (dto.address) {
                studentBuilder.buildAddress(dto.address);
            }
            if (!dto.major || !dto.unversityName) {
                throw new Error("Student role requires 'major' (and 'university'.");
            }
            const user = studentBuilder.build();
            user.setOtp(otp);
            await this.unitOfWork.StudentRepostoies.save(user);
            await this.emailService.sendRegistrationEmail(user.getEmail(), otp.getValue());
            await this.unitOfWork.commit();
            return {
                message: "user register scussful! verfied you email otp ",
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
exports.RegisterStudentUseCase = RegisterStudentUseCase;
