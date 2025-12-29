import { ApartmentDocumentEntity } from "../../../Domain/Entities/apartmentDocumentEntity.entity";
import { ApartmentDocumentModel } from "../../Database/orm/TypeOrm/entity/ApartmentDocument.entity";

export class ApartmentDocumentMapper {
  public static toModel(
    entity: ApartmentDocumentEntity
  ): ApartmentDocumentModel {
    const model = new ApartmentDocumentModel();

    model.apartmentDocumentId = entity.getApartmentId();
    model.apartmentType = entity.getApartmentType();
    model.documentUrl = entity.getDocumentUrl();
    return model;
  }

  public static toEntity(
    model: ApartmentDocumentModel
  ): ApartmentDocumentEntity {
    return new ApartmentDocumentEntity({
      apartmentId: model.apartmentDocumentId,
      apartmentType: model.apartmentType,
      documentUrl: model.documentUrl,
    });
  }
}
