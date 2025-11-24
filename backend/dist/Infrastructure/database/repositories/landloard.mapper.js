"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandlordMapper = void 0;
const landloardEntity_entity_1 = require("../../../Core/entites/landloardEntity.entity");
const UserGovId_vo_1 = require("../../../Core/value-object/UserGovId.vo");
const Landloard_entity_1 = require("../orm/TypeOrm/entity/Landloard.entity");
const user_mapper_1 = require("./user.mapper");
class LandlordMapper {
    static toOrm(landlord) {
        const model = new Landloard_entity_1.LandlordModel();
        model.userId = landlord.getUserId();
        model.CliQAccount = landlord.getCliQAccount();
        model.LandlordGovId = landlord.getGovId();
        model.user = user_mapper_1.UserMapper.toOrm(landlord.getUser());
        return model;
    }
    static toEntity(model) {
        return new landloardEntity_entity_1.LandlordEntity({
            user: user_mapper_1.UserMapper.toEntity(model.user),
            cliQAccount: model.CliQAccount,
            landlordGovId: new UserGovId_vo_1.GovernmentID(model.LandlordGovId),
        });
    }
}
exports.LandlordMapper = LandlordMapper;
