"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRepository = void 0;
const user_repositories_1 = require("./user.repositories");
const Student_entity_1 = require("../database/orm/TypeOrm/entity/Student.entity");
const student_mapper_1 = require("./student.mapper");
const user_mapper_1 = require("./user.mapper");
class StudentRepository {
    constructor(manager) {
        this.manager = manager;
        this.userRepo = new user_repositories_1.UserRepository(manager);
    }
    async createNewStudent(user) {
        try {
            const userEntity = await user.getUser();
            await this.userRepo.addNewUser(userEntity);
            const model = student_mapper_1.StudentMapper.toModel(user);
            model.user = user_mapper_1.UserMapper.toOrm(userEntity);
            await this.manager.save(Student_entity_1.StudentModel, model);
        }
        catch (err) {
            console.error("failed to create Student !!", err);
            throw err;
        }
    }
    async updateStudent(user) {
        try {
            const userEntity = user.getUser();
            await this.userRepo.updateUser(userEntity);
            const studentModel = student_mapper_1.StudentMapper.toModel(user);
            studentModel.user = user_mapper_1.UserMapper.toOrm(userEntity);
            await this.manager.update(Student_entity_1.StudentModel, { userId: studentModel.userId }, studentModel);
        }
        catch (err) {
            console.error("failed to update Student !!", err);
            throw err;
        }
    }
}
exports.StudentRepository = StudentRepository;
