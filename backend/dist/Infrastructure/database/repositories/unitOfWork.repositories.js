"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitOfWorkRepositories = void 0;
const data_source_1 = require("../orm/TypeOrm/data-source");
const user_repositories_1 = require("./user.repositories");
const student_repositories_1 = require("./student.repositories");
const landloard_repositories_1 = require("./landloard.repositories");
const User_entity_1 = require("../orm/TypeOrm/entity/User.entity");
const Student_entity_1 = require("../orm/TypeOrm/entity/Student.entity");
const Landloard_entity_1 = require("../orm/TypeOrm/entity/Landloard.entity");
class UnitOfWorkRepositories {
    constructor() {
        this.queryRunner = null;
    }
    async commit() {
        if (!this.queryRunner) {
            throw new Error("Transaction has not been started. Call startTransaction() first.");
        }
        try {
            await this.queryRunner.commitTransaction();
        }
        finally {
            await this.queryRunner.release();
            this.queryRunner = null;
        }
    }
    async rollBack() {
        if (!this.queryRunner) {
            throw new Error("Transaction has not been started.");
        }
        try {
            await this.queryRunner.rollbackTransaction();
        }
        finally {
            await this.queryRunner.release();
            this.queryRunner = null;
        }
    }
    async startTransaction() {
        this.queryRunner = data_source_1.AppDataSource.createQueryRunner();
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();
        const userManager = this.queryRunner.manager.getRepository(User_entity_1.User);
        const studentManager = this.queryRunner.manager.getRepository(Student_entity_1.Student);
        const landlordManager = this.queryRunner.manager.getRepository(Landloard_entity_1.Landlord);
        this.userRepotories = new user_repositories_1.UserRepository(userManager);
        this.StudentRepostoies = new student_repositories_1.StudentRepository(studentManager, userManager);
        this.LandloardReposotries = new landloard_repositories_1.LandloardRepository(landlordManager, userManager);
    }
}
exports.UnitOfWorkRepositories = UnitOfWorkRepositories;
