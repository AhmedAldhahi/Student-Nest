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
exports.UserModel = void 0;
const typeorm_1 = require("typeorm");
const UserRole_enum_1 = require("../../../../../Core/enum/UserRole.enum");
const UserAccountStatus_enum_1 = require("../../../../../Core/enum/UserAccountStatus.enum");
const Landloard_entity_1 = require("./Landloard.entity");
const Student_entity_1 = require("./Student.entity");
const Admin_entity_1 = require("./Admin.entity");
let UserModel = class UserModel {
};
exports.UserModel = UserModel;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], UserModel.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 75 }),
    __metadata("design:type", String)
], UserModel.prototype, "Name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150, unique: true }),
    __metadata("design:type", String)
], UserModel.prototype, "Email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150 }),
    __metadata("design:type", String)
], UserModel.prototype, "Password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 15 }),
    __metadata("design:type", String)
], UserModel.prototype, "PhoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 4 }),
    __metadata("design:type", String)
], UserModel.prototype, "DateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "Address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "Photo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: UserRole_enum_1.UserRole }),
    __metadata("design:type", String)
], UserModel.prototype, "Role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: UserAccountStatus_enum_1.UserAccountStatus,
        default: UserAccountStatus_enum_1.UserAccountStatus.activate,
    }),
    __metadata("design:type", String)
], UserModel.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserModel.prototype, "emailVerfied", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, nullable: true }),
    __metadata("design:type", Object)
], UserModel.prototype, "otpCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Object)
], UserModel.prototype, "otpExpired", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserModel.prototype, "resetPasswordVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, nullable: true }),
    __metadata("design:type", Object)
], UserModel.prototype, "OtpResetPasswordCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Object)
], UserModel.prototype, "OtpExpiredResetPassword", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "createAt" }),
    __metadata("design:type", Date)
], UserModel.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updateAt" }),
    __metadata("design:type", Date)
], UserModel.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Landloard_entity_1.LandlordModel, (landlord) => landlord.user),
    __metadata("design:type", Landloard_entity_1.LandlordModel)
], UserModel.prototype, "landlord", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Student_entity_1.StudentModel, (student) => student.user),
    __metadata("design:type", Student_entity_1.StudentModel)
], UserModel.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Admin_entity_1.AdminModel, (admin) => admin.user),
    __metadata("design:type", Admin_entity_1.AdminModel)
], UserModel.prototype, "admin", void 0);
exports.UserModel = UserModel = __decorate([
    (0, typeorm_1.Entity)("user")
], UserModel);
