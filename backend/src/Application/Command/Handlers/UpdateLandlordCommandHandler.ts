import { IReadLandlordRepositories } from "../../../Domain/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { UserDateOfBirth } from "../../../Domain/Value-Object/UserDateOfBirth.vo";
import { UserName } from "../../../Domain/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../Domain/Value-Object/UserPhoneNumber.vo";
import { IFileStorageService } from "../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../Interfaces/IPassword.interface";
import { UpdateLandlordCommand } from "../Commands/UpdateLandlordCommand";
import { ICommandHandlers } from "../ICommandHandlers";

export class UpdateLandlordCommandHandler
  implements ICommandHandlers<UpdateLandlordCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly readUserRepo: IReadLandlordRepositories,
    private readonly fileService: IFileStorageService,
    private readonly passwordService: IPasswordService
  ) {}

  public async handle(command: UpdateLandlordCommand): Promise<void> {
    try {
      const landlord = await this.readUserRepo.findLandlordById(command.userId);
      if (!landlord) throw new Error("no user found !!");

      // Update fields
      if (command.address) landlord.getUser().setAddress(command.address);

      if (command.dateOfBirth)
        landlord
          .getUser()
          .updateDateOfBirth(UserDateOfBirth.create(command.dateOfBirth));

      if (command.name)
        landlord.getUser().updateName(UserName.create(command.name));

      if (command.phoneNumber)
        landlord
          .getUser()
          .updatePhoneNumber( userPhoneNumber.create(command.phoneNumber));

      if (command.photo) {
        const photo = landlord.getUser().getPhoto();
        if (photo) {
          let photoDoc: string = await this.fileService.update(
            command.photo,
            photo
          );
          landlord.getUser().setPhoto(photoDoc);
        }
        let photoDoc: string = await this.fileService.upload(command.photo);
        landlord.getUser().setPhoto(photoDoc);
      }

      if (command.newPassword && command.oldPassword) {
        const validatePass = await this.passwordService.compare(
          command.oldPassword,
          landlord.getUser().getPass()
        );

        if (!validatePass) throw new Error("old pass is not correct");
        const newPass = await this.passwordService.hash(command.newPassword);

        if (
          await this.passwordService.compare(
            newPass,
            landlord.getUser().getPass()
          )
        )
          throw new Error("you use this password before");

        landlord.getUser().setPassword(newPass);
      }

      if (command.cliQAccount) {
        landlord.updateCliQAccount(command.cliQAccount);
      }

      // Save the updated user
      await this.uow.startTransaction();
      await this.uow.writeLandlordRepo.updateLandlord(landlord);
      await this.uow.commitTransaction();

      // Return success message
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("Error updating profile:", error.message);
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
