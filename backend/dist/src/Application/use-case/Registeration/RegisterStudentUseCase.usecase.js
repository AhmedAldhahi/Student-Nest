"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterStudentUseCase = void 0;
const OTP_vo_1 = require("../../../Core/value-object/OTP.vo");
const uuid_1 = require("uuid");
const userEntity_entity_1 = require("../../../Core/entites/userEntity.entity");
const UserName_vo_1 = require("../../../Core/value-object/UserName.vo");
const UserDateOfBirth_vo_1 = require("../../../Core/value-object/UserDateOfBirth.vo");
const UserPhoneNumber_vo_1 = require("../../../Core/value-object/UserPhoneNumber.vo");
const UserEmail_vo_1 = require("../../../Core/value-object/UserEmail.vo");
const UserRole_enum_1 = require("../../../Core/enum/UserRole.enum");
const studentEntity_entity_1 = require("../../../Core/entites/studentEntity.entity");
const StudentMajor_vo_1 = require("../../../Core/value-object/StudentMajor.vo");
const StudentGraduateYear_vo_1 = require("../../../Core/value-object/StudentGraduateYear.vo");
const StudentCard_vo_1 = require("../../../Core/value-object/StudentCard.vo");
const StudentUniversity_vo_1 = require("../../../Core/value-object/StudentUniversity.vo");
const UserGovId_vo_1 = require("../../../Core/value-object/UserGovId.vo");
const StudentVerficationDocument_vo_1 = require("../../../Core/value-object/StudentVerficationDocument.vo");
class RegisterStudentUseCase {
    constructor(unitOfWork, passwordService, emailService, fileService) {
        this.unitOfWork = unitOfWork;
        this.passwordService = passwordService;
        this.emailService = emailService;
        this.fileService = fileService;
    }
    async execute(dto) {
        const otp = OTP_vo_1.OTP.generate();
        const userId = (0, uuid_1.v4)();
        const hashPass = await this.passwordService.hash(dto.password);
        const user = new userEntity_entity_1.UserEntity({
            userId: userId,
            password: hashPass,
            name: new UserName_vo_1.UserName(dto.name),
            dateOfBirth: new UserDateOfBirth_vo_1.UserDateOfBirth(dto.dateOfBirth),
            phoneNumber: new UserPhoneNumber_vo_1.userPhoneNumber(dto.phoneNumber),
            email: new UserEmail_vo_1.UserEmail(dto.email),
            role: UserRole_enum_1.UserRole.student,
            address: dto.address,
        });
        user.setOtpForEmail(otp);
        let verificationFilesUrl = await this.fileService.upload(dto.verificationFile);
        const student = new studentEntity_entity_1.StudentEntity({
            user: user,
            major: new StudentMajor_vo_1.StudentMajor(dto.major),
            graduateYear: new StudentGraduateYear_vo_1.studentGraduateYear(dto.gradateYear),
            studentCardId: new StudentCard_vo_1.StudentCard(dto.studentCardId),
            universityName: new StudentUniversity_vo_1.StudentUniversity(dto.universityName),
            userGovId: new UserGovId_vo_1.GovernmentID(dto.studentGovId),
            validateStudentDocument: new StudentVerficationDocument_vo_1.StudentVerificationDocument(verificationFilesUrl),
        });
        await this.unitOfWork.startTransaction();
        try {
            const exciteUser = await this.unitOfWork.userRepo.findByEmail(dto.email);
            if (exciteUser)
                throw new Error("user with this email already exist");
            await this.unitOfWork.userRepo.addNewUser(user);
            await this.unitOfWork.studentRepo.createNewStudent(student);
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
            message: "Student registered successfully! Verify your email with the OTP.",
        };
    }
}
exports.RegisterStudentUseCase = RegisterStudentUseCase;
