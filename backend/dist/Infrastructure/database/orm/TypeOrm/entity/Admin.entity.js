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
exports.AdminModel = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const AuditLog_entity_1 = require("./AuditLog.entity");
let AdminModel = class AdminModel {
};
exports.AdminModel = AdminModel;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], AdminModel.prototype, "adminId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_entity_1.UserModel, { cascade: true, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_entity_1.UserModel)
], AdminModel.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AuditLog_entity_1.AuditLogModel, (auditLog) => auditLog.admin),
    __metadata("design:type", Array)
], AdminModel.prototype, "auditLogs", void 0);
exports.AdminModel = AdminModel = __decorate([
    (0, typeorm_1.Entity)("admins")
], AdminModel);
