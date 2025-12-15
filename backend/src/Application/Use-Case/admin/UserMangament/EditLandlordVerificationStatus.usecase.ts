import { IUnitOfWork } from "../../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { EditLandlordVerificationStatusRequest } from "../../../Dtos/admin/EditLandlordVerificationStatusRequest.dto";
import { ICashMemoryService } from "../../../Interfaces/ICash.interface";

export class EditLandlordVerificationStatusUseCase {
  constructor(
    private unitOfWork: IUnitOfWork,
    private cashService: ICashMemoryService
  ) {}

  public async execute(
    userId: string,
    dto: EditLandlordVerificationStatusRequest
  ) {
    try {
      await this.unitOfWork.startTransaction();
      const user = await this.unitOfWork.landlordRepo.findLandlordById(userId);
      if (!user) throw new Error("no user found !!");

      if (!user.getVerificationFile())
        throw new Error("user must have upload verification files");

      const cashKey = `profile : ${userId}`;
      await this.cashService.delete(cashKey);

      if (dto.Verified === false) user.resetLandlordVerified();
      else user.markLandlordAsVerified();

      await this.unitOfWork.landlordRepo.updateLandlord(user);

      await this.unitOfWork.commitTransaction();

      return {
        message: "landlord status updated scussfuly ",
      };
    } catch (error: any) {
      await this.unitOfWork.rollbackTransaction();
      console.error("error while updating landlord status");
      throw error;
    }
  }
}
