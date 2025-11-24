"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifiedOtpUseCase = void 0;
class VerifiedOtpUseCase {
    constructor(tokenService, unitOfrWork) {
        this.tokenService = tokenService;
        this.unitOfrWork = unitOfrWork;
    }
    async execute(dto) {
        await this.unitOfrWork.startTransaction();
        try {
            const user = await this.unitOfrWork.userRepo.findByEmail(dto.email);
            if (!user)
                throw new Error("No user found for this email.");
            if (user.getVerifiedEmail()) {
                throw new Error("User already verified.");
            }
            console.log(user.getVerifiedEmail());
            const otp = user.getOtpForEmail();
            const otpExpired = user.getOtpExpiredForEmail();
            if (!otp || !otpExpired)
                throw new Error("OTP not sent for this email.");
            if (new Date() > otpExpired)
                throw new Error("OTP expired. Request a new one.");
            if (otp !== dto.otpCode)
                throw new Error("Invalid OTP code.");
            user.verifiedEmail();
            user.clearEmailOTP();
            await this.unitOfrWork.userRepo.addNewUser(user);
            await this.unitOfrWork.commitTransaction();
            const payload = { userId: user.getUserId() };
            const token = this.tokenService.generateAccessToken(payload);
            return {
                message: "Email verified successfully.",
                token,
            };
        }
        catch (err) {
            await this.unitOfrWork.rollbackTransaction();
            console.error("OTP verification failed:", err);
            if (err instanceof Error)
                throw err;
            throw new Error("Failed to verify OTP. Please try again.");
        }
        finally {
            await this.unitOfrWork.releaseTransaction();
        }
    }
}
exports.VerifiedOtpUseCase = VerifiedOtpUseCase;
