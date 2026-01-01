import { ApartmentPhotoDocumentEntity } from "../../../Domain/Modules/Housing/Entities/phohtoDocumentEntity.entity";
import { ApartmentPhotoModel } from "../../Database/orm/TypeOrm/entity/ApartmentPhoto.entity";
import { ApartmentMapper } from "./apartment.mapper";

export class apartmentPhotoMapper {
  public static toModel(
    entity: ApartmentPhotoDocumentEntity
  ): ApartmentPhotoModel {
    const model = new ApartmentPhotoModel();

    model.apartmentPhotoId = entity.getPhotoId();
    model.photoUrl = entity.getPhotoUrl();

    return model;
  }

  public static toEntity(
    model: ApartmentPhotoModel
  ): ApartmentPhotoDocumentEntity {
    return new ApartmentPhotoDocumentEntity({
      photoId: model.apartmentPhotoId,
      photoUrl: model.photoUrl,
    });
  }
}
