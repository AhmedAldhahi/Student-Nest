"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildControllers = void 0;
const container_1 = require("../../../Infrastructure/DI/container");
const Registeration_controller_1 = require("./Registeration.controller");
const Verfication_controller_1 = require("./Verfication.controller");
const PasswordRecovery_controller_1 = require("./PasswordRecovery.controller");
const buildControllers = () => {
    const { useCases } = (0, container_1.buildDependencies)();
    const authController = new Registeration_controller_1.AuthController(useCases.registerStudentUseCase, useCases.registerLandlordUseCase, useCases.loginUseCase);
    const verficationController = new Verfication_controller_1.VerficationController(useCases.resendOtpUseCase, useCases.verifiedOtpUseCase);
    const passwordRecoverController = new PasswordRecovery_controller_1.PasswordRecoverController(useCases.forgetPasswordUseCase);
    return { authController, verficationController, passwordRecoverController };
};
exports.buildControllers = buildControllers;
