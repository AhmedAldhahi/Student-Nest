"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgetPasswordUseCase = void 0;
class ForgetPasswordUseCase {
    constructor(unitOfWork, tokenService, passwordService) {
        this.unitOfWork = unitOfWork;
        this.tokenService = tokenService;
        this.passwordService = passwordService;
    }
    async execute(dto) {
        await this.unitOfWork.startTransaction();
        try {
            const user = await this.unitOfWork.userRepo.findByEmail(dto.email);
            if (!user) {
                throw new Error("no user been found !!");
            }
            if (!user.getVerifiedResetPassword()) {
                throw new Error("the user have to verified otp before update password !!");
            }
            const currentHashedPassword = user.getPass();
            const isUsedBefore = await this.passwordService.compare(dto.password, currentHashedPassword);
            if (isUsedBefore) {
                throw new Error("this password been used before");
            }
            const newHashedPassword = await this.passwordService.hash(dto.password);
            user.setPassword(newHashedPassword);
            await this.unitOfWork.userRepo.addNewUser(user);
            const payload = {
                userId: user.getUserId(),
            };
            const Token = await this.tokenService.generateAccessToken(payload);
            await this.unitOfWork.commitTransaction();
            return {
                message: "user password been update scussfuly ",
                token: Token,
            };
        }
        catch (err) {
            await this.unitOfWork.rollbackTransaction();
            if (err instanceof Error) {
                console.error("failed to update  password !!", err);
            }
            throw err;
        }
    }
}
exports.ForgetPasswordUseCase = ForgetPasswordUseCase;
