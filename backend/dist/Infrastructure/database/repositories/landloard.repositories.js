"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandloardRepository = void 0;
const landloard_mapper_1 = require("./landloard.mapper");
class LandloardRepository {
    constructor(landloardRepository, userRepository) {
        this.landloardRepository = landloardRepository;
        this.userRepository = userRepository;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { Email: email },
        });
        if (!user) {
            return null;
        }
        const dbLandlord = await this.landloardRepository.findOne({
            where: { user: { userId: user.userId } },
            relations: ["user"],
        });
        if (!dbLandlord) {
            return null;
        }
        return landloard_mapper_1.LandlordMapper.toDomain(dbLandlord);
    }
    async findById(id) {
        const dbLandlord = await this.landloardRepository.findOne({
            where: { user: { userId: id } },
            relations: ["user"],
        });
        if (!dbLandlord) {
            return null;
        }
        return landloard_mapper_1.LandlordMapper.toDomain(dbLandlord);
    }
    async save(landlord) {
        const dbLandlord = landloard_mapper_1.LandlordMapper.toPersistence(landlord);
        await this.landloardRepository.save(dbLandlord);
    }
}
exports.LandloardRepository = LandloardRepository;
