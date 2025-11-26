"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_mapper_1 = require("./user.mapper");
const User_entity_1 = require("../database/orm/TypeOrm/entity/User.entity");
class UserRepository {
    constructor(manager) {
        this.manager = manager;
    }
    async findById(id) {
        const user = await this.manager.findOne(User_entity_1.UserModel, { where: { userId: id } });
        return user ? user_mapper_1.UserMapper.toEntity(user) : null;
    }
    async findByEmail(email) {
        const user = await this.manager.findOne(User_entity_1.UserModel, { where: { Email: email } });
        return user ? user_mapper_1.UserMapper.toEntity(user) : null;
    }
    async addNewUser(user) {
        const model = user_mapper_1.UserMapper.toOrm(user);
        await this.manager.save(User_entity_1.UserModel, model);
    }
    async updateUser(user) {
        const model = user_mapper_1.UserMapper.toOrm(user);
        await this.manager.update(User_entity_1.UserModel, { userId: model.userId }, model);
    }
    async deleteUser(id) {
        await this.manager.delete(User_entity_1.UserModel, { userId: id });
    }
}
exports.UserRepository = UserRepository;
