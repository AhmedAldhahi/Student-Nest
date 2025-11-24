"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendOtpForgetPasswordUseCase = void 0;
const OTP_vo_1 = require("../../Core/value-object/OTP.vo");
class ResendOtpForgetPasswordUseCase {
    constructor(emailService, unitOfWork) {
        this.emailService = emailService;
        this.unitOfWork = unitOfWork;
    }
    async excute(dto) {
        await this.unitOfWork.startTransaction();
        const otp = OTP_vo_1.OTP.generate();
        const otpvalue = otp.getValue();
        try {
            const user = await this.unitOfWork.userRepo.findByEmail(dto.email);
            if (!user) {
                throw new Error("no user been found !!");
            }
            user.setOTPForResetPassword(otp);
            console.log(user.getOTPForResetPassword(), user.getOTPExpiredDateForResetPassword());
            await this.unitOfWork.userRepo.addNewUser(user);
            await this.emailService.sendPasswordResetEmail(dto.email, otpvalue);
            await this.unitOfWork.commitTransaction();
            return {
                message: "OTP has been resent successfully. Check your email.",
            };
        }
        catch (err) {
            await this.unitOfWork.rollbackTransaction();
            console.error("Failed to resend OTP code:", err.message);
            throw err;
        }
    }
}
exports.ResendOtpForgetPasswordUseCase = ResendOtpForgetPasswordUseCase;
