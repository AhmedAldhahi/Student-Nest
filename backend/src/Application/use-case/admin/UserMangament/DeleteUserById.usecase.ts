import { IUnitOfWork } from "../../../../Core/repositories/UnitOfWorkRepositories.repositories";

export class DeleteLandlordByIdUseCase {
  constructor(private unitOfWork: IUnitOfWork) {}

  public async execute(userId: string) {
    try {
      await this.unitOfWork.startTransaction();
      const user = await this.unitOfWork.userRepo.findById(userId);
      if (!user) throw new Error("no user found !!");

      // remove user
      await this.unitOfWork.userRepo.deleteUser(userId);

      await this.unitOfWork.commitTransaction();

      return {
        message: "user been deleted ",
      };
    } catch (error: any) {
      await this.unitOfWork.rollbackTransaction();
      console.error("fail to delete user !!");
      throw error;
    }
  }
}
