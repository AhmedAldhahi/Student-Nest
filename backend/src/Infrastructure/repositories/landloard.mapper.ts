import { LandlordEntity } from "../../Core/entites/landloardEntity.entity";
import { GovernmentID } from "../../Core/value-object/UserGovId.vo";
import { VerificationDocument } from "../../Core/value-object/VerficationDocument.vo";
import { LandlordModel } from "../database/orm/TypeOrm/entity/Landloard.entity";
import { UserMapper } from "./user.mapper";

export class LandlordMapper {
  public static toOrm(landlord: LandlordEntity): LandlordModel {
    const model = new LandlordModel();

    model.userId = landlord.getUserId();
    model.CliQAccount = landlord.getCliQAccount();
    model.document = landlord.getVerificationFile();
    model.LandlordGovId = landlord.getGovId();
    model.user = UserMapper.toOrm(landlord.getUser());

    return model;
  }

  public static toEntity(model: LandlordModel): LandlordEntity {
    return new LandlordEntity({
      user: UserMapper.toEntity(model.user),
      cliQAccount: model.CliQAccount,
      landlordGovId: new GovernmentID(model.LandlordGovId),
      document: new VerificationDocument(model.document),
    });
  }
}
