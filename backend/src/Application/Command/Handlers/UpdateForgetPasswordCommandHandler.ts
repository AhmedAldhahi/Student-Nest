import { UserEntity } from "../../../Domain/Entities/userEntity.entity";
import { IReadUserRepositories } from "../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { IPasswordService } from "../../Interfaces/IPassword.interface";
import { UpdateForgetPasswordCommand } from "../Commands/UpdateForgetPasswordCommand";
import { ICommandHandlers } from "../ICommandHandlers";

export class UpdateForgetPasswordCommandHandler
  implements ICommandHandlers<UpdateForgetPasswordCommand>
{
  constructor(
    private passwordService: IPasswordService,
    private unitOfWork: IUnitOfWork,
    private readRepo: IReadUserRepositories
  ) {}

  public async handle(
    command: UpdateForgetPasswordCommand
  ): Promise<UserEntity> {
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

      user.setPassword(newHashedPassword);

      await this.unitOfWork.startTransaction();
      await this.unitOfWork.writeUserRepo.updateUser(user);

      await this.unitOfWork.commitTransaction();

      return user;
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
