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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const UserRole_enum_1 = require("../../../../../Core/enum/UserRole.enum");
const UserAccountStatus_enum_1 = require("../../../../../Core/enum/UserAccountStatus.enum");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], User.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], User.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "Address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 4 }),
    __metadata("design:type", String)
], User.prototype, "DateOfBirth", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150, unique: true }),
    __metadata("design:type", String)
], User.prototype, "Email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "emailVerfied", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 75 }),
    __metadata("design:type", String)
], User.prototype, "Name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150 }),
    __metadata("design:type", String)
], User.prototype, "Password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: UserRole_enum_1.UserRole }),
    __metadata("design:type", String)
], User.prototype, "Role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 15 }),
    __metadata("design:type", String)
], User.prototype, "PhoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "Photo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: UserAccountStatus_enum_1.UserAccountStatus,
        default: UserAccountStatus_enum_1.UserAccountStatus.activate,
    }),
    __metadata("design:type", String)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "otpCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "otpExpired", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("user")
], User);
