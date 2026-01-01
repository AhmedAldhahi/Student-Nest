import { LandlordResponseDTO } from "../../../Application/DTO/profile/LandlordResponeDTO";
import { LandlordAggregateRoot } from "../../../Domain/Modules/Housing/AgregateRoot/landloardEntity.entity";
import { GovernmentID } from "../../../Domain/Shared/Value-Object/UserGovId.vo";
import { VerificationDocument } from "../../../Domain/Shared/Value-Object/VerficationDocument.vo";
import { LandlordModel } from "../../Database/orm/TypeOrm/entity/Landloard.entity";
import { UserModel } from "../../Database/orm/TypeOrm/entity/User.entity";

export class LandlordMapper {
  public static toOrm(landlord: LandlordAggregateRoot): LandlordModel {
    const model = new LandlordModel();
    const validationModel = this.toModelValidation(landlord);

    model.userId = landlord.getUserId();
    model.CliQAccount = landlord.getCliQAccount();
    model.document = validationModel.document;
    model.LandlordGovId = validationModel.GovId;
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
      userId: model.userId,
      cliQAccount: model.CliQAccount,
      landlordGovId: new GovernmentID(model.LandlordGovId),
      document: new VerificationDocument(model.document),
      isVerifiedLandlord: model.Verified,
    });
  }

  public static toResponse(landlordModel: LandlordModel): LandlordResponseDTO {
    const userModel = new UserModel();
    return {
      user: {
        userId: userModel.userId,
        name: userModel.Name,
        dateOfBirth: userModel.DateOfBirth,
        email: userModel.Email,
        role: userModel.Role,
        phoneNumber: userModel.PhoneNumber,
        address: userModel.Address,
        photo: userModel.Photo,
        createdAt: userModel.createAt,
        emailVerified: userModel.emailVerfied,
      },
      cliQAccount: landlordModel.CliQAccount,
      landlordGovId: landlordModel.LandlordGovId,
      verifiedLandlord: landlordModel.Verified,
      document: landlordModel.document,
    };
  }
}
