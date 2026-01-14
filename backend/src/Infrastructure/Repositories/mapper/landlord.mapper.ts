import { LandlordAggregateRoot } from "../../../Domain/BoundedContexts/IdentityAndAccess/Aggregates/landloardAggregateRoot.entity";
import { LandlordResponseDTO } from "../../../Domain/BoundedContexts/IdentityAndAccess/Representations/LandlordResponseDTO";
import { GovernmentID } from "../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserGovId.vo";
import { VerificationDocument } from "../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/VerficationDocument.vo";
import { LandlordModel } from "../../Database/TypeOrm/entity/Landlord.entity";

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
    return {
      user: {
        userId: landlordModel.user.userId,
        name: landlordModel.user.Name,
        dateOfBirth: landlordModel.user.DateOfBirth,
        email: landlordModel.user.Email,
        role: landlordModel.user.Role,
        phoneNumber: landlordModel.user.PhoneNumber,
        address: landlordModel.user.Address,
        photo: landlordModel.user.Photo,
        createdAt: landlordModel.user.createAt,
        emailVerified: landlordModel.user.emailVerfied,
      },
      cliQAccount: landlordModel.CliQAccount,
      landlordGovId: landlordModel.LandlordGovId,
      verifiedLandlord: landlordModel.Verified,
      document: landlordModel.document,
    };
  }
}
