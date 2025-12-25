import { FindOptionsWhere, Like } from "typeorm";
import { StudentResponseDto } from "../../../Application/Dtos/profile/StudentResponseDto";
import { StudentAggregateRoot } from "../../../Domain/AggregatesRoot/studentEntity.entity";
import { IReadStudentRepositories } from "../../../Domain/Repositories/Read/ReadStudentRepositories.repositories";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { StudentModel } from "../../Database/orm/TypeOrm/entity/Student.entity";
import { StudentMapper } from "../mapper/student.mapper";

export class ReadStudentRepositories implements IReadStudentRepositories {
  public async findAllStudent(): Promise<StudentResponseDto[] | null> {
    try {
      const studentModels = await AppDataSource.getInstance()
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

      if (!studentModels || studentModels.length === 0) return [];

      return studentModels.map((orm) => {
        return StudentMapper.toResponse(orm);
      });
    } catch (error: any) {
      console.error("fail to get all students", error);
      throw error;
    }
  }

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

  public async searchByEmail(
    prefix: string
  ): Promise<StudentResponseDto[] | null> {
    try {
      const query = prefix.trim();

      const phoneRegex = /^(?:(?:\+962|00)\s?0?|0)?\s?(7[789])\s?(\d{7})$/;
      const isNumeric = /^\d+$/.test(query);

      let whereCondition:
        | FindOptionsWhere<StudentModel>
        | FindOptionsWhere<StudentModel>[];

      if (query.includes("@")) {
        whereCondition = { user: { Email: Like(`%${query}%`) } };
      } else if (isNumeric || phoneRegex.test(query)) {
        if (phoneRegex.test(query)) {
          whereCondition = { user: { PhoneNumber: Like(`%${query}%`) } };
        } else {
          whereCondition = [
            { user: { PhoneNumber: Like(`%${query}%`) } },
            { StudentGovId: Like(`${query}%`) },
          ];
        }
      } else {
        whereCondition = [
          { user: { Name: Like(`%${query}%`) } },
          { Major: Like(`%${query}%`) },
          { UniversityName: Like(`%${query}%`) },
          { StudentCardId: Like(`${query}%`) },
        ];
      }

      const studentModels = await AppDataSource.getInstance()
        .getRepository(StudentModel)
        .find({
          where: whereCondition,
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

      if (!studentModels || studentModels.length === 0) return [];

      return studentModels.map((orm) => StudentMapper.toResponse(orm));
    } catch (error: any) {
      console.error("Failed to search students", error);
      throw new Error("Error while searching students");
    }
  }
}
