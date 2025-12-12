import { EntityManager, TreeLevelColumn } from "typeorm";
import { StudentEntity } from "../../Core/entites/studentEntity.entity";
import {
  IStudentRepository,
  StudentResponseDto,
} from "../../Core/repositories/StudentRepositories.repositories";
import { UserRepository } from "./user.repositories";
import { StudentModel } from "../database/orm/TypeOrm/entity/Student.entity";
import { StudentMapper } from "./student.mapper";
import { UserMapper } from "./user.mapper";

export class StudentRepository implements IStudentRepository {
  private manager: EntityManager;
  private userRepo: UserRepository;

  constructor(manager: EntityManager) {
    this.manager = manager;
    this.userRepo = new UserRepository(manager);
  }

  async findStudentById(userId: string): Promise<StudentEntity | null> {
    const user = await this.manager.findOne(StudentModel, {
      where: { userId: userId },
      relations: ["user"],
    });
    return user ? StudentMapper.toEntity(user) : null;
  }

  async createNewStudent(user: StudentEntity): Promise<void> {
    try {
      const userEntity = await user.getUser();

      // 1. Save User (Uses Transaction Manager)
      await this.userRepo.addNewUser(userEntity);

      const model = StudentMapper.toModel(user);
      model.user = UserMapper.toOrm(userEntity);

      await this.manager.save(StudentModel, model);
    } catch (error: any) {
      console.error("failed to create Student !!", error);
      throw error;
    }
  }
  async updateStudent(user: StudentEntity): Promise<void> {
    try {
      const userEntity = user.getUser();
      await this.userRepo.updateUser(userEntity);
      const studentModel = StudentMapper.toModel(user);
      studentModel.user = UserMapper.toOrm(userEntity);

      await this.manager.update(
        StudentModel,
        { userId: studentModel.userId },
        studentModel
      );
    } catch (error: any) {
      console.error("failed to update Student !!", error);
      throw error;
    }
  }

  async findAllStudent(): Promise<StudentResponseDto[] | null> {
    try {
      const studentModels = await this.manager
        .getRepository(StudentModel)
        .find({
          select: {
            GraduationYear: true,
            Major: true,
            StudentCardId: true,
            StudentGovId: true,
            UniversityName: true,
            verificationFiles: true,

            user: {
              userId: true,
              Email: true,
              Name: true,
              PhoneNumber: true,
              DateOfBirth: true,
              Address: true,
              Role: true,
              Photo: true,
              isActive: true,
              emailVerfied: true,
              createAt: true,
              updateAt: true,
            },
          },
          relations: {
            user: true,
          },
        });

      if (!studentModels || studentModels.length === 0) return null;

      return studentModels.map((orm) => {
        const studentEntity = StudentMapper.toEntity(orm);
        const userResponse = UserMapper.toUserResponse(orm.user);

        return {
          user: userResponse,
          studentCardID: studentEntity.getStudentCardID().valueOf(),
          GraduationYear: studentEntity.getGraduateYear().valueOf(),
          Major: studentEntity.getMajor().valueOf(),
          universityName: studentEntity.getUniversityName().valueOf(),
          userGovId: studentEntity.getGovernmentId().valueOf(),
          studentValidateDocument: studentEntity
            .getVerificationDocument()
            .valueOf(),
        };
      });
    } catch (error: any) {
      console.error("fail to get all students", error);
      throw error;
    }
  }
}
