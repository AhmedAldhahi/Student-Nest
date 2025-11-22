import { ITokenService } from "../interfaces/IToken.interface";

import { IUnitOfWork } from "../../Core/repositories/UnitOfWorkRepositories.repositories";
import { IPasswordService } from "../interfaces/IPassword.interface";
import { ForgetPasswordRequest } from "../dtos/ForgetPasswordRequest.dtos";

export class ForgetPasswordUseCase {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly tokenService: ITokenService,
    private readonly passwordService: IPasswordService
  ) {}

  public async execute(dto: ForgetPasswordRequest) {
    await this.unitOfWork.startTransaction();
    try {
      const user = await this.unitOfWork.userRepo.findByEmail(dto.email);
      if (!user) {
        throw new Error("no user been found !!");
      }

      if (!user.getVerifiedResetPassword()) {
        throw new Error(
          "the user have to verified otp before update password !!"
        );
      }

      const currentHashedPassword = user.getPass();

      const isUsedBefore = await this.passwordService.compare(
        dto.password,
        currentHashedPassword
      );

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
    } catch (err: any) {
      await this.unitOfWork.rollbackTransaction();
      if (err instanceof Error) {
        console.error("failed to update  password !!", err);
      }

      throw err;
    }
  }
}
