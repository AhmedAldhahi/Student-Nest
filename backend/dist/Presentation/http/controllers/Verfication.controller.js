"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerficationController = void 0;
class VerficationController {
    constructor(resendOtpUseCase, verfiedOtpUseCase) {
        this.resendOtpUseCase = resendOtpUseCase;
        this.verfiedOtpUseCase = verfiedOtpUseCase;
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
        this.createVerfiedOtp = async (req, res) => {
            try {
                const dto = req.body;
                const result = await this.verfiedOtpUseCase.execute(dto);
                return res.status(200).json(result);
            }
            catch (err) {
                return res.status(400).json({ message: err.message });
            }
        };
    }
}
exports.VerficationController = VerficationController;
