"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendOtpUseCase = void 0;
const OTP_ValueObject_1 = require("../../Core/value-object/OTP.ValueObject");
const NoUseExictException_error_1 = require("../Error/NoUseExictException.error");
class ResendOtpUseCase {
    constructor(emailService, unitOfWork) {
        this.emailService = emailService;
        this.unitOfWork = unitOfWork;
    }
    async excute(dto) {
        await this.unitOfWork.startTransaction();
        const otp = OTP_ValueObject_1.OTP.generate();
        const otpvalue = otp.getValue();
        const otpExpired = otp.getExpiresAt();
        try {
            const user = await this.unitOfWork.userRepotories.findByEmail(dto.email);
            if (!user) {
                throw new NoUseExictException_error_1.NoUserExistException();
            }
            user.setOtp(otp);
            user.setOtpExpired(otpExpired);
            await this.unitOfWork.userRepotories.save(user);
            console.log(user.getPassword());
            await this.emailService.resendOtpEmail(dto.email, otpvalue);
            await this.unitOfWork.commit();
            return {
                message: "OTP has been resent successfully. Check your email.",
            };
        }
        catch (err) {
            await this.unitOfWork.rollBack();
            console.error("Failed to resend OTP code:", err.message);
            throw err;
        }
    }
}
exports.ResendOtpUseCase = ResendOtpUseCase;
