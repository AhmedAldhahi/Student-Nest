"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogModel = void 0;
const typeorm_1 = require("typeorm");
const Admin_entity_1 = require("./Admin.entity");
const AuditLogAction_enum_1 = require("../../../../../Core/enum/AuditLogAction.enum");
const UserRole_enum_1 = require("../../../../../Core/enum/UserRole.enum");
let AuditLogModel = class AuditLogModel {
};
exports.AuditLogModel = AuditLogModel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], AuditLogModel.prototype, "logID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: AuditLogAction_enum_1.AuditLogActionType }),
    __metadata("design:type", String)
], AuditLogModel.prototype, "actionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], AuditLogModel.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], AuditLogModel.prototype, "actionTimestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 36 }),
    __metadata("design:type", String)
], AuditLogModel.prototype, "targetUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150 }),
    __metadata("design:type", String)
], AuditLogModel.prototype, "targetUserName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: UserRole_enum_1.UserRole }),
    __metadata("design:type", String)
], AuditLogModel.prototype, "targetUserRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 36 }),
    __metadata("design:type", String)
], AuditLogModel.prototype, "performedByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150 }),
    __metadata("design:type", String)
], AuditLogModel.prototype, "performedByUserName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: UserRole_enum_1.UserRole }),
    __metadata("design:type", String)
], AuditLogModel.prototype, "performedByUserRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], AuditLogModel.prototype, "record", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Object)
], AuditLogModel.prototype, "fieldName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json", nullable: true }),
    __metadata("design:type", Object)
], AuditLogModel.prototype, "oldValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json", nullable: true }),
    __metadata("design:type", Object)
], AuditLogModel.prototype, "newValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], AuditLogModel.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150 }),
    __metadata("design:type", String)
], AuditLogModel.prototype, "deviceInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 80 }),
    __metadata("design:type", String)
], AuditLogModel.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Admin_entity_1.AdminModel, (admin) => admin.auditLogs, {
        onDelete: "SET NULL",
    }),
    __metadata("design:type", Admin_entity_1.AdminModel)
], AuditLogModel.prototype, "admin", void 0);
exports.AuditLogModel = AuditLogModel = __decorate([
    (0, typeorm_1.Entity)("AuditLog")
], AuditLogModel);
