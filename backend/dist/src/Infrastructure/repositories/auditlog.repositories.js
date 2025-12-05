"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogRepositories = void 0;
const auditlog_mapper_1 = require("./auditlog.mapper");
const AuditLog_entity_1 = require("../database/orm/TypeOrm/entity/AuditLog.entity");
class AuditLogRepositories {
    constructor(manager) {
        this.manager = manager;
    }
    async createLog(log) {
        const model = auditlog_mapper_1.AuditLogMapper.toModel(log);
        await this.manager.save(AuditLog_entity_1.AuditLogModel, model);
    }
    findAll() {
        throw new Error("Method not implemented.");
    }
    findByUserEmail(email) {
        throw new Error("Method not implemented.");
    }
}
exports.AuditLogRepositories = AuditLogRepositories;
