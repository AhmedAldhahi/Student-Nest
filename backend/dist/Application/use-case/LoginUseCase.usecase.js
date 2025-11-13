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
            const user = await this.unitOfWork.userRepotories.findByEmail(dto.email);
            if (!user) {
                throw new Error("the password or email not correct ");
            }
            const isValid = await this.passwordService.compare(dto.password, user.getPassword());
            console.log(dto.password, user.getPassword());
            if (!isValid) {
                throw new Error("the password or email not correct 1 ");
            }
            await this.unitOfWork.userRepotories.save(user);
            const payload = {
                userId: user.getUserId(),
            };
            const Token = await this.tokenService.generateAccessToken(payload);
            await this.unitOfWork.commit();
            return {
                message: "user login scussfuly",
                token: Token,
            };
        }
        catch (err) {
            await this.unitOfWork.rollBack();
            if (err instanceof Error) {
                console.error("failed to login to the our system !!");
            }
            throw err;
        }
    }
}
exports.LoginUseCase = LoginUseCase;
