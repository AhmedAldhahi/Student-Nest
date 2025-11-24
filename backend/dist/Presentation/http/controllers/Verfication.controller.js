"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationController = void 0;
class VerificationController {
    constructor(resendOtpUseCase, verifiedOtpUseCase) {
        this.resendOtpUseCase = resendOtpUseCase;
        this.verifiedOtpUseCase = verifiedOtpUseCase;
        this.createResendOtp = async (req, res) => {
            try {
                const dto = req.body;
                const result = await this.resendOtpUseCase.excute(dto);
                return res.status(200).json(result);
            }
            catch (error) {
                if (error.message === "failed to resend otp!1") {
                    return res.status(409).json({ message: error.message });
                }
                const status = error.statusCode || 400;
                return res
                    .status(status)
                    .json({ error: error.message || "server Error" });
            }
        };
        this.createVerifiedOtp = async (req, res) => {
            try {
                const dto = req.body;
                const result = await this.verifiedOtpUseCase.execute(dto);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        };
    }
}
exports.VerificationController = VerificationController;
