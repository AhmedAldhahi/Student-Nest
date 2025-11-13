"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgetPasswordUseCase = void 0;
const NoUseExictException_error_1 = require("../Error/NoUseExictException.error");
const PasswordUsedBeforeException_error_1 = require("../Error/PasswordUsedBeforeException.error");
class ForgetPasswordUseCase {
    constructor(unitOfWork, tokenService, passwordService) {
        this.unitOfWork = unitOfWork;
        this.tokenService = tokenService;
        this.passwordService = passwordService;
    }
    async execute(dto) {
        await this.unitOfWork.startTransaction();
        try {
            const user = await this.unitOfWork.userRepotories.findByEmail(dto.email);
            if (!user) {
                throw new NoUseExictException_error_1.NoUserExistException();
            }
            const currentHashedPassword = user.getPassword();
            const isUsedBefore = await this.passwordService.compare(dto.password, currentHashedPassword);
            if (isUsedBefore) {
                throw new PasswordUsedBeforeException_error_1.PasswordBeenUsedBeforeException();
            }
            const newHashedPassword = await this.passwordService.hash(dto.password);
            user.setPass(newHashedPassword);
            await this.unitOfWork.userRepotories.save(user);
            const payload = {
                userId: user.getUserId(),
            };
            const Token = await this.tokenService.generateAccessToken(payload);
            await this.unitOfWork.commit();
            return {
                message: "user password been update scussfuly ",
                token: Token,
            };
        }
        catch (err) {
            await this.unitOfWork.rollBack();
            if (err instanceof Error) {
                console.error("failed to update  password !!", err);
            }
            throw err;
        }
    }
}
exports.ForgetPasswordUseCase = ForgetPasswordUseCase;
