"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandlordRepository = void 0;
const Landloard_entity_1 = require("../database/orm/TypeOrm/entity/Landloard.entity");
const user_repositories_1 = require("./user.repositories");
const landloard_mapper_1 = require("./landloard.mapper");
const user_mapper_1 = require("./user.mapper");
class LandlordRepository {
    constructor(manager) {
        this.manager = manager;
        this.userRepo = new user_repositories_1.UserRepository(manager);
    }
    async createNewLandlord(landlord) {
        try {
            const userEntity = await landlord.getUser();
            await this.userRepo.addNewUser(userEntity);
            const model = landloard_mapper_1.LandlordMapper.toOrm(landlord);
            model.user = user_mapper_1.UserMapper.toOrm(userEntity);
            await this.manager.save(Landloard_entity_1.LandlordModel, model);
        }
        catch (err) {
            console.error("failed to create landlord !!", err);
            throw err;
        }
    }
    async updateLandlord(user) {
        try {
            const userEntity = user.getUser();
            await this.userRepo.updateUser(userEntity);
            const landlordModel = landloard_mapper_1.LandlordMapper.toOrm(user);
            landlordModel.user = user_mapper_1.UserMapper.toOrm(userEntity);
            await this.manager.update(Landloard_entity_1.LandlordModel, { userId: landlordModel.userId }, landlordModel);
        }
        catch (err) {
            console.error("failed to update landlord !!", err);
            throw err;
        }
    }
}
exports.LandlordRepository = LandlordRepository;
