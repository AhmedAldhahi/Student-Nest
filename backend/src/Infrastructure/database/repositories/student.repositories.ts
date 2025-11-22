import { EntityManager } from "typeorm";
import { StudentEntity } from "../../../Core/entites/studentEntity.entity";
import { IStudentRepository } from "../../../Core/repositories/StudentRepositories.repositories";
import { UserRepository } from "./user.repositories";
import { StudentModel } from "../orm/TypeOrm/entity/Student.entity";
import { StudentMapper } from "./student.mapper";
import { UserMapper } from "./user.mapper";

export class StudentRepository implements IStudentRepository {
  private manager: EntityManager;
  private userRepo: UserRepository;

  constructor(manager: EntityManager) {
    this.manager = manager;
    this.userRepo = new UserRepository(manager);
  }

  async createNewStudent(user: StudentEntity): Promise<void> {
    try {
      const userEntity = await user.getUser();

      // 1. Save User (Uses Transaction Manager)
      await this.userRepo.addNewUser(userEntity);

      const model = StudentMapper.toModel(user);
      model.user = UserMapper.toOrm(userEntity);

      await this.manager.save(StudentModel, model);
    } catch (err: any) {
      console.error("failed to create Student !!", err);
      throw err;
    }
  }
  async updateStudent(user: StudentEntity): Promise<void> {
    try {
      const userEntity = user.getUser();
      await this.userRepo.updateUser(userEntity);
      const studentModel = StudentMapper.toModel(user);
      studentModel.user = UserMapper.toOrm(userEntity);

      // ✅ FIXED: Use manager for update too
      await this.manager.update(
        StudentModel,
        { userId: studentModel.userId },
        studentModel
      );
    } catch (err: any) {
      console.error("failed to update Student !!", err);
      throw err;
    }
  }
}
      
  
