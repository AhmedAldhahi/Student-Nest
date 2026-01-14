import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { IFileStorageService } from "../../../Interfaces/IFileStorage.interface";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { DeleteUserCommand } from "../Command/DeleteUserCommand";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { DeleteUserResponse } from "../Dto/Response/DeleteUserResponse";

export class DeleteUserCommandHandler
  implements ICommandHandlers<DeleteUserCommand>
{
  constructor(
    private uow: IUnitOfWork,
    private readUserRepo: IReadUserRepositories,
    private fileService: IFileStorageService
  ) {}

  public async handle(command: DeleteUserCommand): Promise<DeleteUserResponse> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user found !!");

      const photo = user.getPhoto();
      if (photo) {
        await this.fileService.deleteImageFromCloudinary(photo);
      }

      await this.uow.startTransaction();
      await this.uow.writeUserRepo.deleteUser(command.userId);
      await this.uow.commitTransaction();
      return {
        message: "user been deleted ",
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to delete user id");
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
