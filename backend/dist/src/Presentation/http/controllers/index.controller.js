"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildControllers = void 0;
const container_1 = require("../../../Infrastructure/DI/container");
const PasswordRecovery_controller_1 = require("./PasswordRecovery.controller");
const Profile_controller_1 = require("./Profile.controller");
const Registeration_controller_1 = require("./Registeration.controller");
const Verfication_controller_1 = require("./Verfication.controller");
const buildControllers = () => {
    const { useCases } = (0, container_1.buildDependencies)();
    const authController = new Registeration_controller_1.AuthController(useCases.registerLandlordUseCase, useCases.registerStudentUseCase, useCases.LoginUseCase);
    const verificationController = new Verfication_controller_1.VerificationController(useCases.resendOTPUseCase, useCases.verifiedOTPUseCase);
    const passwordRecoverController = new PasswordRecovery_controller_1.PasswordRecoverController(useCases.forgetPasswordUseCase, useCases.resendOtpForgetPassword, useCases.verfiedForgetPasswordUseCase);
    const profileController = new Profile_controller_1.ProfileController(useCases.userProfileData, useCases.updateProfileUseCase);
    return {
        authController,
        verificationController,
        passwordRecoverController,
        profileController,
    };
};
exports.buildControllers = buildControllers;
