import { Repository } from "typeorm";
// We no longer import AppDataSource here
import { StudentMapper } from "./student.mapper";
import { Student as TypeOrmStudent } from "../orm/TypeOrm/entity/Student.entity";
import { User as TypeOrmUser } from "../orm/TypeOrm/entity/User.entity";
import { Student as DomainStudent } from "../../../Core/entites/student.entity";
import { IStudentRepository } from "../../../Core/repositories/StudentRepoitories.repoitories";

export class StudentRepository implements IStudentRepository {
  /**
   * THIS IS THE FIX.
   * This class needs two repositories, so its constructor
   * must accept both from the Unit of Work.
   */
  constructor(
    private readonly studentRepository: Repository<TypeOrmStudent>,
    private readonly userRepository: Repository<TypeOrmUser>
  ) {}

  async findByEmail(email: string): Promise<DomainStudent | null> {
    const user = await this.userRepository.findOne({
      where: { Email: email },
    });

    if (!user) {
      return null;
    }

    const dbStudent = await this.studentRepository.findOne({
      where: { user: { userId: user.userId } }, // Corrected find logic
      relations: ["user"],
    });

    if (!dbStudent) {
      return null;
    }

    return StudentMapper.toDomain(dbStudent);
  }

  async findById(id: string): Promise<DomainStudent | null> {
    const dbStudent = await this.studentRepository.findOne({
      where: { user: { userId: id } }, // Corrected find logic
      relations: ["user"],
    });

    if (!dbStudent) {
      return null;
    }

    return StudentMapper.toDomain(dbStudent);
  }

  async save(student: DomainStudent): Promise<void> {
    const dbStudent = StudentMapper.toPersistence(student);
    await this.studentRepository.save(dbStudent);
  }
}
