import { EntityManager } from "typeorm";
import { StudentAggregateRoot } from "../../../Domain/AggregatesRoot/studentEntity.entity";
import { IWriteStudentRepositories } from "../../../Domain/Repositories/Write/WriteStudentRepositories.repositories";
import { WriteUserRepositories } from "./WriteUserRepositories";
import { StudentMapper } from "../student.mapper";
import { StudentModel } from "../../Database/orm/TypeOrm/entity/Student.entity";

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
