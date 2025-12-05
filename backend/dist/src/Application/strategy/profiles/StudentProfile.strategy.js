"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentProfileStrategy = void 0;
const StudentCard_vo_1 = require("../../../Core/value-object/StudentCard.vo");
const StudentGraduateYear_vo_1 = require("../../../Core/value-object/StudentGraduateYear.vo");
const StudentMajor_vo_1 = require("../../../Core/value-object/StudentMajor.vo");
const StudentUniversity_vo_1 = require("../../../Core/value-object/StudentUniversity.vo");
const StudentVerficationDocument_vo_1 = require("../../../Core/value-object/StudentVerficationDocument.vo");
const UserDateOfBirth_vo_1 = require("../../../Core/value-object/UserDateOfBirth.vo");
const UserName_vo_1 = require("../../../Core/value-object/UserName.vo");
const UserPhoneNumber_vo_1 = require("../../../Core/value-object/UserPhoneNumber.vo");
class StudentProfileStrategy {
    constructor(studentRep, passwordService, fileService) {
        this.studentRep = studentRep;
        this.passwordService = passwordService;
        this.fileService = fileService;
    }
    async UserProfile(userId) {
        const user = await this.studentRep.findStudentById(userId);
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
            major: user.getMajor(),
            gradateYear: user.getGraduateYear(),
            studentCardId: user.getStudentCardID(),
            universityName: user.getUniversityName(),
            studentGovId: user.getGovernmentId(),
            verificationFile: user.getVerificationDocument(),
        };
    }
    async UpdateUserProfile(userId, dto) {
        try {
            const user = await this.studentRep.findStudentById(userId);
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
            if (dto.major) {
                user.updateMajor(new StudentMajor_vo_1.StudentMajor(dto.major));
            }
            if (dto.gradateYear) {
                user.updateGraduateYear(new StudentGraduateYear_vo_1.studentGraduateYear(dto.gradateYear));
            }
            if (dto.studentCardId) {
                user.updateStudentCardID(new StudentCard_vo_1.StudentCard(dto.studentCardId));
            }
            if (dto.universityName) {
                user.updateUniversityName(new StudentUniversity_vo_1.StudentUniversity(dto.universityName));
            }
            if (dto.verificationFile) {
                let verifiedFile = await this.fileService.upload(dto.verificationFile);
                user.updateVerificationDocument(new StudentVerficationDocument_vo_1.StudentVerificationDocument(verifiedFile));
            }
            await this.studentRep.updateStudent(user);
            return {
                message: "student updated profile succfully ",
            };
        }
        catch (error) {
            console.error("fail to update student profile", error);
            throw error;
        }
    }
}
exports.StudentProfileStrategy = StudentProfileStrategy;
