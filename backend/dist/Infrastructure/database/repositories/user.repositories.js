"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_mapper_1 = require("./user.mapper");
class UserRepository {
    constructor(ormRepository) {
        this.ormRepository = ormRepository;
    }
    async findByEmail(email) {
        const dbUser = await this.ormRepository.findOne({
            where: { Email: email },
        });
        if (!dbUser) {
            return null;
        }
        return user_mapper_1.UserMapper.toDomain(dbUser);
    }
    async findById(id) {
        const dbUser = await this.ormRepository.findOneBy({
            userId: id,
        });
        if (!dbUser) {
            return null;
        }
        return user_mapper_1.UserMapper.toDomain(dbUser);
    }
    async save(user) {
        const dbUser = user_mapper_1.UserMapper.toPersistence(user);
        await this.ormRepository.save(dbUser);
    }
}
exports.UserRepository = UserRepository;
