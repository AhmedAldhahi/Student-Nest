import { GoogleMapLocationEntity } from "../../../Domain/Modules/Housing/Entities/googleMapLocationEntity.entity";
import { GoogleMapLocationModel } from "../../Database/orm/TypeOrm/entity/GoogleMapLocation.entity";

export class GoogleMapMapper {
  
  public static toModel(
    entity: GoogleMapLocationEntity
  ): GoogleMapLocationModel {
    const model = new GoogleMapLocationModel();
    model.googleMapLocationId = entity.getGoogleMapLocationId();
    model.latitude = entity.getLatitude();
    model.longitude = entity.getLongitude();

    return model;
  }

  public static toEntity(
    model: GoogleMapLocationModel
  ): GoogleMapLocationEntity {
    return new GoogleMapLocationEntity({
      placeId: model.googleMapLocationId,
      longitude: model.longitude,
      latitude: model.latitude,
    });
  }
}
