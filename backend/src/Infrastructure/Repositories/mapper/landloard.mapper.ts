import { LandlordResponseDTO } from "../../../Application/Dtos/profile/LandlordResponeDTO";
import { LandlordAggregateRoot } from "../../../Domain/AggregatesRoot/landloardEntity.entity";
import { GovernmentID } from "../../../Domain/Value-Object/UserGovId.vo";
import { VerificationDocument } from "../../../Domain/Value-Object/VerficationDocument.vo";
import { LandlordModel } from "../../Database/orm/TypeOrm/entity/Landloard.entity";
import { UserMapper } from "./user.mapper";

export class LandlordMapper {
  public static toOrm(landlord: LandlordAggregateRoot): LandlordModel {
    const model = new LandlordModel();
    const validationModel = this.toModelValidation(landlord);

    model.userId = landlord.getUserId();
    model.CliQAccount = landlord.getCliQAccount();
    model.document = validationModel.document;
    model.LandlordGovId = validationModel.GovId;
    model.user = UserMapper.toOrm(landlord.getUser());
    model.Verified = landlord.getLandlordVerified();

    return model;
  }

  private static toModelValidation(landlord: LandlordAggregateRoot) {
    const document = landlord.getVerificationFile();
    const GovId = landlord.getGovId();

    if (!document)
      throw new Error("Cannot save landlord, document file  is require!!");

    if (!GovId)
      throw new Error("Cannot save landlord, government file is require !!");

    return { document, GovId };
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

  public static toResponse(landlordModel: LandlordModel): LandlordResponseDTO {
    return {
      user: UserMapper.toUserResponse(landlordModel.user),
      cliQAccount: landlordModel.CliQAccount,
      landlordGovId: landlordModel.LandlordGovId,
      verifiedLandlord: landlordModel.Verified,
      document: landlordModel.document,
    };
  }
}


