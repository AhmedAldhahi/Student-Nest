"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRegisterLandlordUseCase = makeRegisterLandlordUseCase;
exports.makeRegisterStudentUseCase = makeRegisterStudentUseCase;
exports.makeLoginUseCase = makeLoginUseCase;
const unitOfWork_repositories_1 = require("../repositories/unitOfWork.repositories");
const MailtrapService_service_1 = require("../services/email/MailtrapService.service");
const RegisterLandloardUseCase_usecase_1 = require("../../Application/use-case/Registeration/RegisterLandloardUseCase.usecase");
const RegisterStudentUseCase_usecase_1 = require("../../Application/use-case/Registeration/RegisterStudentUseCase.usecase");
const BcryptPasswordHasher_service_1 = require("../services/security/BcryptPasswordHasher.service");
const CloudinaryService_service_1 = require("../services/media/CloudinaryService.service");
const LoginUseCase_usecase_1 = require("../../Application/use-case/Registeration/LoginUseCase.usecase");
const TokenService_service_1 = require("../services/security/TokenService.service");
function makeRegisterLandlordUseCase() {
    const unitOfWork = new unitOfWork_repositories_1.UnitOfWork();
    const passwordService = new BcryptPasswordHasher_service_1.BcryptPasswordHasher();
    const emailService = new MailtrapService_service_1.MailtrapService();
    return new RegisterLandloardUseCase_usecase_1.RegisterLandloardUseCase(unitOfWork, passwordService, emailService);
}
function makeRegisterStudentUseCase() {
    const unitOfWork = new unitOfWork_repositories_1.UnitOfWork();
    const passwordService = new BcryptPasswordHasher_service_1.BcryptPasswordHasher();
    const emailService = new MailtrapService_service_1.MailtrapService();
    const cloudinaryService = new CloudinaryService_service_1.CloudinaryService();
    return new RegisterStudentUseCase_usecase_1.RegisterStudentUseCase(unitOfWork, passwordService, emailService, cloudinaryService);
}
function makeLoginUseCase() {
    const unitOfWork = new unitOfWork_repositories_1.UnitOfWork();
    const token = new TokenService_service_1.JwtTokenService();
    const passwordService = new BcryptPasswordHasher_service_1.BcryptPasswordHasher();
    return new LoginUseCase_usecase_1.LoginUseCase(unitOfWork, token, passwordService);
}
