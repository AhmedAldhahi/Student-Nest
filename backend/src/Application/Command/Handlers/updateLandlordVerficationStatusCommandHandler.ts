import { IReadLandlordRepositories } from "../../../Domain/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { EditLandlordVerificationStatus } from "../Commands/UpdateVerficationLandlordStatusCommand";
import { ICommandHandlers } from "../ICommandHandlers";

export class updateVerificationStatusCommandHandler
  implements ICommandHandlers<EditLandlordVerificationStatus>
{
  constructor(
    private readLandlordRepo: IReadLandlordRepositories,
    private uow: IUnitOfWork
  ) {}

  public async handle(command: EditLandlordVerificationStatus): Promise<any> {
    try {
      const user = await this.readLandlordRepo.findLandlordById(command.userId);
      if (!user) throw new Error("no user found !!");

      if (!user.getVerificationFile())
        throw new Error("user must have upload verification files");

      if (command.Verified === false) user.resetLandlordVerified();
      else user.markLandlordAsVerified();

      await this.uow.startTransaction();
      await this.uow.writeLandlordRepo.updateLandlord(user);
      await this.uow.commitTransaction();
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to update edit landlord status", error);
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
