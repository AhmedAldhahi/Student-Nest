import { LandlordAggregateRoot } from "../../Domain/AggregatesRoot/landloardEntity.entity";
import { GovernmentID } from "../../Domain/Value-Object/UserGovId.vo";
import { VerificationDocument } from "../../Domain/Value-Object/VerficationDocument.vo";
import { LandlordModel } from "../Database/orm/TypeOrm/entity/Landloard.entity";
import { UserMapper } from "./user.mapper";

export class LandlordMapper {
  public static toOrm(landlord: LandlordAggregateRoot): LandlordModel {
    const model = new LandlordModel();

    model.userId = landlord.getUserId();
    model.CliQAccount = landlord.getCliQAccount();
    model.document = landlord.getVerificationFile();
    model.LandlordGovId = landlord.getGovId();
    model.user = UserMapper.toOrm(landlord.getUser());
    model.Verified = landlord.getLandlordVerified();

    return model;
  }

  public static toEntity(model: LandlordModel): LandlordAggregateRoot {
    return new LandlordAggregateRoot({
      user: UserMapper.toEntity(model.user),
      cliQAccount: model.CliQAccount,
      landlordGovId: new GovernmentID(model.LandlordGovId),
      document: new VerificationDocument(model.document),
      verified: model.Verified,
    });
  }
}
