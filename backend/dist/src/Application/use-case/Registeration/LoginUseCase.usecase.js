"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
class LoginUseCase {
    constructor(unitOfWork, tokenService, passwordService) {
        this.unitOfWork = unitOfWork;
        this.tokenService = tokenService;
        this.passwordService = passwordService;
    }
    async execute(dto) {
        try {
            await this.unitOfWork.startTransaction();
            const user = await this.unitOfWork.userRepo.findByEmail(dto.email);
            if (!user) {
                throw new Error("the password or email not correct");
            }
            const isValid = await this.passwordService.compare(dto.password, user.getPass());
            if (!isValid) {
                throw new Error("the password or email not correct");
            }
            const verifiedEmail = user.getVerifiedEmail();
            const payload = {
                userId: user.getUserId(),
            };
            const Token = await this.tokenService.generateAccessToken(payload);
            await this.unitOfWork.commitTransaction();
            return {
                message: "user login scussfuly",
                token: Token,
                verifiedEmail: verifiedEmail,
            };
        }
        catch (err) {
            await this.unitOfWork.rollbackTransaction();
            if (err instanceof Error) {
                console.error(err.message);
            }
            throw err;
        }
    }
}
exports.LoginUseCase = LoginUseCase;
