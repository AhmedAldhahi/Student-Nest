"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitOfWork = void 0;
const user_repositories_1 = require("./user.repositories");
const landloard_repositories_1 = require("./landloard.repositories");
const data_source_1 = require("../database/orm/TypeOrm/data-source");
const student_repositories_1 = require("./student.repositories");
class UnitOfWork {
    constructor() {
        this.queryRunner = null;
    }
    async startTransaction() {
        this.queryRunner = data_source_1.AppDataSource.getInstance().createQueryRunner();
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();
        const manager = this.queryRunner.manager;
        this.userRepo = new user_repositories_1.UserRepository(manager);
        this.landlordRepo = new landloard_repositories_1.LandlordRepository(manager);
        this.studentRepo = new student_repositories_1.StudentRepository(manager);
    }
    async commitTransaction() {
        if (!this.queryRunner)
            return;
        try {
            await this.queryRunner.commitTransaction();
        }
        catch (err) {
            await this.rollbackTransaction();
            throw err;
        }
        finally {
            await this.releaseTransaction();
        }
    }
    async rollbackTransaction() {
        if (!this.queryRunner)
            return;
        try {
            if (this.queryRunner.isTransactionActive) {
                await this.queryRunner.rollbackTransaction();
            }
        }
        finally {
            await this.releaseTransaction();
        }
    }
    async releaseTransaction() {
        if (this.queryRunner && !this.queryRunner.isReleased) {
            await this.queryRunner.release();
        }
        this.queryRunner = null;
    }
}
exports.UnitOfWork = UnitOfWork;
