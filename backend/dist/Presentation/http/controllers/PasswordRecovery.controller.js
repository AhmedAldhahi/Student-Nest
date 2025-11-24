"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRecoverController = void 0;
class PasswordRecoverController {
    constructor(forgetPassword, resendOtpForgetPassUseCase, verifiedOtpForgetPassUseCase) {
        this.forgetPassword = forgetPassword;
        this.resendOtpForgetPassUseCase = resendOtpForgetPassUseCase;
        this.verifiedOtpForgetPassUseCase = verifiedOtpForgetPassUseCase;
        this.changeForgetPassword = async (req, res) => {
            try {
                const dto = req.body;
                const result = await this.forgetPassword.execute(dto);
                return res.status(200).json(result);
            }
            catch (error) {
                console.log("failed to update forgetting password !!");
                const status = error.statusCode || 400;
                return res
                    .status(status)
                    .json({ message: error.message || "failed password change" });
            }
        };
        this.createResendForgetPasswordOtp = async (req, res) => {
            try {
                const dto = req.body;
                const result = await this.resendOtpForgetPassUseCase.excute(dto);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(400).json({ error: error.message || "server Error" });
            }
        };
        this.createVerifiedResendPasswordOTP = async (req, res) => {
            try {
                const dto = req.body;
                const result = await this.verifiedOtpForgetPassUseCase.execute(dto);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(400).json({ err: error.message || "server Error " });
            }
        };
    }
}
exports.PasswordRecoverController = PasswordRecoverController;
