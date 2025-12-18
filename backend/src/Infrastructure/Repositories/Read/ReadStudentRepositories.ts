import { StudentAggregateRoot } from "../../../Domain/AggregatesRoot/studentEntity.entity";
import { IReadStudentRepositories } from "../../../Domain/Repositories/Read/ReadStudentRepositories.repositories";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { StudentModel } from "../../Database/orm/TypeOrm/entity/Student.entity";
import { StudentMapper } from "../student.mapper";

export class ReadStudentRepositories implements IReadStudentRepositories {
  public async findStudentById(
    userId: string
  ): Promise<StudentAggregateRoot | null> {
    try {
      const student = await AppDataSource.getInstance()
        .getRepository(StudentModel)
        .findOne({
          where: { userId },
          relations: ["user"],
        });

      return student ? StudentMapper.toEntity(student) : null;
    } catch (error) {
      console.error("Error finding landlord by ID:", error);
      throw new Error("Error retrieving landlord data");
    }
  }
}
