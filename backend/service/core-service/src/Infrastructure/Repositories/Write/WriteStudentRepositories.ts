import { EntityManager } from "typeorm";
import { WriteUserRepositories } from "./WriteUserRepositories";
import { StudentMapper } from "../mapper/student.mapper";
import { StudentModel } from "../../Database/TypeOrm/entity/Student.entity";
import { IWriteStudentRepositories } from "../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/WriteStudentRepositories.repositories";
import { StudentAggregateRoot } from "../../../Domain/BoundedContexts/IdentityAndAccess/Aggregates/StudentAggregateRoot.entity";

export class WriteStudentRepositories implements IWriteStudentRepositories {
  private writeUserRepo: WriteUserRepositories;
  private manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
    this.writeUserRepo = new WriteUserRepositories(manager);
  }

  public async addNewStudent(user: StudentAggregateRoot): Promise<void> {
    const model = StudentMapper.toModel(user);
    await this.manager.save(StudentModel, model);
  }

  public async updateStudent(user: StudentAggregateRoot): Promise<void> {
    const model = StudentMapper.toModel(user);
    await this.manager.save(StudentModel, model);
  }
}
