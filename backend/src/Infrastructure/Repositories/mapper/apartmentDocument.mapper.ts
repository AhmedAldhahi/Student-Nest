import { ApartmentDocumentEntity } from "../../../Domain/Modules/Housing/Entities/apartmentDocumentEntity.entity";
import { ApartmentDocumentModel } from "../../Database/orm/TypeOrm/entity/ApartmentDocument.entity";

export class ApartmentDocumentMapper {
  public static toModel(
    entity: ApartmentDocumentEntity
  ): ApartmentDocumentModel {
    const model = new ApartmentDocumentModel();

    model.apartmentDocumentId = entity.getApartmentDocumentId();
    model.apartmentType = entity.getApartmentType();
    model.documentUrl = entity.getDocumentUrl();
    model.apartmentsId = entity.getApartmentsId();
    return model;
  }

  public static toEntity(
    model: ApartmentDocumentModel
  ): ApartmentDocumentEntity | null {
    return new ApartmentDocumentEntity({
      apartmentDocumentId: model.apartmentDocumentId,
      apartmentType: model.apartmentType,
      documentUrl: model.documentUrl,
      apartmentsId: model.apartmentsId,
    });
  }
}
