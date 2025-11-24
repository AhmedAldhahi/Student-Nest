"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeVerifiedEmailOTP = makeVerifiedEmailOTP;
exports.makeResendEmailOTP = makeResendEmailOTP;
exports.makeUpdateForgetPass = makeUpdateForgetPass;
exports.makeResendForgetPassword = makeResendForgetPassword;
exports.makeVerfiedForgetPasswordOTP = makeVerfiedForgetPasswordOTP;
const VerfiedOtpUseCase_usecase_1 = require("../../Application/use-case/VerfiedOtpUseCase.usecase");
const TokenService_service_1 = require("../services/TokenService.service");
const unitOfWork_repositories_1 = require("../database/repositories/unitOfWork.repositories");
const SendGridService_service_1 = require("../services/email/SendGridService.service");
const ForgetPasswordUseCase_usecase_1 = require("../../Application/use-case/ForgetPasswordUseCase.usecase");
const BcryptPasswordHasher_service_1 = require("../services/BcryptPasswordHasher.service");
const ResendOtpForgetPasswordUseCase_usecase_1 = require("../../Application/use-case/ResendOtpForgetPasswordUseCase.usecase");
const VerfiedForgetPasswordOtpUseCase_usecase_1 = require("../../Application/use-case/VerfiedForgetPasswordOtpUseCase.usecase");
const ResendOtpUseCase_usecase_1 = require("../../Application/use-case/ResendOtpUseCase.usecase");
function makeVerifiedEmailOTP() {
    const unitOfrWork = new unitOfWork_repositories_1.UnitOfWork();
    const token = new TokenService_service_1.JwtTokenService();
    return new VerfiedOtpUseCase_usecase_1.VerifiedOtpUseCase(token, unitOfrWork);
}
function makeResendEmailOTP() {
    const unitOfrWork = new unitOfWork_repositories_1.UnitOfWork();
    const emailService = new SendGridService_service_1.SendGridService();
    return new ResendOtpUseCase_usecase_1.ResendOtpUseCase(emailService, unitOfrWork);
}
function makeUpdateForgetPass() {
    const unitOfrWork = new unitOfWork_repositories_1.UnitOfWork();
    const token = new TokenService_service_1.JwtTokenService();
    const passwordService = new BcryptPasswordHasher_service_1.BcryptPasswordHasher();
    return new ForgetPasswordUseCase_usecase_1.ForgetPasswordUseCase(unitOfrWork, token, passwordService);
}
function makeResendForgetPassword() {
    const unitOfrWork = new unitOfWork_repositories_1.UnitOfWork();
    const emailService = new SendGridService_service_1.SendGridService();
    return new ResendOtpForgetPasswordUseCase_usecase_1.ResendOtpForgetPasswordUseCase(emailService, unitOfrWork);
}
function makeVerfiedForgetPasswordOTP() {
    const unitOfWork = new unitOfWork_repositories_1.UnitOfWork();
    return new VerfiedForgetPasswordOtpUseCase_usecase_1.VerifiedForgetPasswordOtpUseCase(unitOfWork);
}
