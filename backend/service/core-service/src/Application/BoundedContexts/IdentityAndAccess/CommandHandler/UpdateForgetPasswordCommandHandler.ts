import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { IPasswordService } from "../../../Interfaces/IPassword.interface";
import { ITokenService } from "../../../Interfaces/IToken.interface";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { UpdateForgetPasswordCommand } from "../Command/UpdateForgetPasswordCommand";
import { VerifiedOtpResponse } from "../Dto/Response/VerifiedOtpResponse";

export class UpdateForgetPasswordCommandHandler
  implements ICommandHandlers<UpdateForgetPasswordCommand>
{
  constructor(
    private readonly passwordService: IPasswordService,
    private readonly unitOfWork: IUnitOfWork,
    private readonly tokenService: ITokenService,
    private readonly readRepo: IReadUserRepositories
  ) {}

  public async handle(
    command: UpdateForgetPasswordCommand
  ): Promise<VerifiedOtpResponse> {
    try {
      const user = await this.readRepo.findByEmail(command.email);

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
        command.password,
        currentHashedPassword
      );

      if (isUsedBefore) {
        throw new Error("this password been used before");
      }

      const newHashedPassword = await this.passwordService.hash(
        command.password
      );

      user.changePassword(newHashedPassword);

      await this.unitOfWork.startTransaction();
      await this.unitOfWork.writeUserRepo.updateUser(user);

      await this.unitOfWork.commitTransaction();

      const payload = {
        userId: user.getUserId(),
      };

      const Token = await this.tokenService.generateAccessToken(payload);

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
    } finally {
      await this.unitOfWork.releaseTransaction();
    }
  }
}
