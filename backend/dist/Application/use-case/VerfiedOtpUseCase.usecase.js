"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifiedOtpUseCase = void 0;
const UserExictException_error_1 = require("../Error/UserExictException.error");
class VerifiedOtpUseCase {
    constructor(tokenService, unitOfrWork) {
        this.tokenService = tokenService;
        this.unitOfrWork = unitOfrWork;
    }
    async execute(dto) {
        await this.unitOfrWork.startTransaction();
        try {
            const user = await this.unitOfrWork.userRepotories.findByEmail(dto.email);
            if (!user) {
                throw new UserExictException_error_1.UserExictException("no user been found !!");
            }
            if (user.getVerfiedEmail())
                throw new Error("user already verified !!");
            const otp = user.getOtpCode();
            const otpExpired = user.getOtpExpired();
            if (!otp || !otpExpired)
                throw new Error("no otp been send for this email !");
            if (new Date() > otpExpired)
                throw new Error("otp expired date recreate new one !!");
            if (otp !== dto.otpCode)
                throw new Error("invalid otp code !!");
            console.log(user.getOtpCode());
            console.log(user.getOtpExpired());
            console.log("Before:", user.getVerfiedEmail());
            user.setVerfiedEmail();
            user.clearOtp();
            console.log("After:", user.getVerfiedEmail());
            await this.unitOfrWork.userRepotories.save(user);
            await this.unitOfrWork.commit();
            const payload = {
                userId: user.getUserId(),
            };
            const Token = this.tokenService.generateAccessToken(payload);
            return {
                message: "email verified scussfuly",
                token: Token,
            };
        }
        catch (err) {
            await this.unitOfrWork.rollBack();
            console.error("Failed to verify OTP:", err);
            if (err instanceof UserExictException_error_1.UserExictException) {
                throw err;
            }
            if (err instanceof Error &&
                (err.message.startsWith("no otp been send") ||
                    err.message.startsWith("otp expired date") ||
                    err.message.startsWith("invalid otp code") ||
                    err.message.startsWith("user already verified !!"))) {
                throw err;
            }
            throw new Error("Failed to verify OTP, please try again later.");
        }
    }
}
exports.VerifiedOtpUseCase = VerifiedOtpUseCase;
