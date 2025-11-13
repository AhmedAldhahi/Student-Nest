"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDependencies = void 0;
const unitOfWork_repositories_1 = require("../database/repositories/unitOfWork.repositories");
const BcryptPasswordHasher_service_1 = require("../database/service/BcryptPasswordHasher.service");
const TokenService_service_1 = require("../database/service/TokenService.service");
const NodemailerService_service_1 = require("../services/email/NodemailerService.service");
const studentBuilder_build_1 = require("../../Application/builder/studentBuilder.build");
const landloardBuilder_build_1 = require("../../Application/builder/landloardBuilder.build");
const RegisterStudentUseCase_usecase_1 = require("../../Application/use-case/RegisterStudentUseCase.usecase");
const RegisterLandloardUseCase_usecase_1 = require("../../Application/use-case/RegisterLandloardUseCase.usecase");
const LoginUseCase_usecase_1 = require("../../Application/use-case/LoginUseCase.usecase");
const ForgetPasswordUseCase_usecase_1 = require("../../Application/use-case/ForgetPasswordUseCase.usecase");
const ResendOtpUseCase_usecase_1 = require("../../Application/use-case/ResendOtpUseCase.usecase");
const VerfiedOtpUseCase_usecase_1 = require("../../Application/use-case/VerfiedOtpUseCase.usecase");
const buildDependencies = () => {
    const unitOfWork = new unitOfWork_repositories_1.UnitOfWorkRepositories();
    const passwordService = new BcryptPasswordHasher_service_1.BcryptPasswordHasher();
    const tokenService = new TokenService_service_1.JwtTokenService();
    const emailService = new NodemailerService_service_1.NodemailerService();
    const studentBuilder = new studentBuilder_build_1.StudentBuilder();
    const landlordBuilder = new landloardBuilder_build_1.LandloardBuilder();
    const registerStudentUseCase = new RegisterStudentUseCase_usecase_1.RegisterStudentUseCase(unitOfWork, passwordService, studentBuilder, emailService);
    const registerLandlordUseCase = new RegisterLandloardUseCase_usecase_1.RegisterLandloardUseCase(unitOfWork, passwordService, landlordBuilder, emailService);
    const loginUseCase = new LoginUseCase_usecase_1.LoginUseCase(unitOfWork, tokenService, passwordService);
    const forgetPasswordUseCase = new ForgetPasswordUseCase_usecase_1.ForgetPasswordUseCase(unitOfWork, tokenService, passwordService);
    const resendOtpUseCase = new ResendOtpUseCase_usecase_1.ResendOtpUseCase(emailService, unitOfWork);
    const verifiedOtpUseCase = new VerfiedOtpUseCase_usecase_1.VerifiedOtpUseCase(tokenService, unitOfWork);
    return {
        useCases: {
            registerStudentUseCase,
            registerLandlordUseCase,
            loginUseCase,
            forgetPasswordUseCase,
            resendOtpUseCase,
            verifiedOtpUseCase,
        },
    };
};
exports.buildDependencies = buildDependencies;
