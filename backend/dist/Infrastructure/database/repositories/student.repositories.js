"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRepository = void 0;
const student_mapper_1 = require("./student.mapper");
class StudentRepository {
    constructor(studentRepository, userRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { Email: email },
        });
        if (!user) {
            return null;
        }
        const dbStudent = await this.studentRepository.findOne({
            where: { user: { userId: user.userId } },
            relations: ["user"],
        });
        if (!dbStudent) {
            return null;
        }
        return student_mapper_1.StudentMapper.toDomain(dbStudent);
    }
    async findById(id) {
        const dbStudent = await this.studentRepository.findOne({
            where: { user: { userId: id } },
            relations: ["user"],
        });
        if (!dbStudent) {
            return null;
        }
        return student_mapper_1.StudentMapper.toDomain(dbStudent);
    }
    async save(student) {
        const dbStudent = student_mapper_1.StudentMapper.toPersistence(student);
        await this.studentRepository.save(dbStudent);
    }
}
exports.StudentRepository = StudentRepository;
