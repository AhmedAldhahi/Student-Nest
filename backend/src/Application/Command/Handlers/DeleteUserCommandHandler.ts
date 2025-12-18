import { IReadUserRepositories } from "../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { IFileStorageService } from "../../Interfaces/IFileStorage.interface";
import { DeleteUserCommand } from "../Commands/DeleteUserCommand";
import { ICommandHandlers } from "../ICommandHandlers";

export class DeleteUserCommandHandler
  implements ICommandHandlers<DeleteUserCommand>
{
  constructor(
    private uow: IUnitOfWork,
    private readUserRepo: IReadUserRepositories,
    private fileService: IFileStorageService
  ) {}

  public async handle(command: DeleteUserCommand): Promise<any> {
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
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to delete user id");
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
