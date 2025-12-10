import { IUnitOfWork } from "../../../../Core/repositories/UnitOfWorkRepositories.repositories";

export class GetAllLandlordUseCase {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  public async execute() {
    try {
      await this.unitOfWork.startTransaction();
      const landlords = await this.unitOfWork.landlordRepo.findAllLandlord();
      await this.unitOfWork.commitTransaction();
      return landlords;
    } catch (error: any) {
      throw error;
    }
  }
}
