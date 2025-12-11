//TODO: need to refactor for DRY principle

import { IUnitOfWork } from "../../../../Core/repositories/UnitOfWorkRepositories.repositories";

export class GetAllStudentUseCase {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  public async execute() {
    try {
      await this.unitOfWork.startTransaction();

      const students = await this.unitOfWork.studentRepo.findAllStudent();
      await this.unitOfWork.commitTransaction();

      return students;
    } catch (error: any) {
      console.error("fail to get all students",error);
      throw error;
    }
  }
}
