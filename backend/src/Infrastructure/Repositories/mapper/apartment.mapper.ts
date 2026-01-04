import {
  IApartmentSimpleDTO,
  IApartmentDTO,
} from "../../../Application/DTO/admin/ApartmentDTo.dto";
import { ApartmentAggregateRoot } from "../../../Domain/Modules/Housing/AgregateRoot/apartmentEntity.entity";
import { ApartmentPrice } from "../../../Domain/Modules/Housing/Value-Object/ApartmentPrice.vo";
import { NumberOfBed } from "../../../Domain/Modules/Housing/Value-Object/NumberOfBed.vo";
import { NumberOfRoom } from "../../../Domain/Modules/Housing/Value-Object/NumberOfRoom.vo";
import { ApartmentModel } from "../../Database/orm/TypeOrm/entity/Apartment.entity";
import { ApartmentDocumentMapper } from "./apartmentDocument.mapper";
import { apartmentPhotoMapper } from "./apartmentPhoto.mapper";
import { GoogleMapMapper } from "./gogleMap.mapper";

export class ApartmentMapper {
  public static toModel(apartment: ApartmentAggregateRoot): ApartmentModel {
    const apartmentModel = new ApartmentModel();
    const validateData = this.modelValidation(apartment);

    (apartmentModel.apartmentId = apartment.getApartmentId()),
      (apartmentModel.isVisible = apartment.getIsVisible()),
      (apartmentModel.title = apartment.getTitle()),
      (apartmentModel.description = apartment.getDescription()),
      (apartmentModel.address = apartment.getAddress()),
      (apartmentModel.isVerified = apartment.getIsVerified()),
      (apartmentModel.isJoin = apartment.getIsJoin()),
      (apartmentModel.createAt = apartment.getCreateAt()),
      (apartmentModel.updateAt = apartment.getUpdateAt()),
      // (apartmentModel.landlord = LandlordMapper.toOrm(apartment.getLandlord()));
      (apartmentModel.landlordId = apartment.getLandlord()),
      (apartmentModel.price = validateData.price);
    apartmentModel.numberOfBed = validateData.numberOfBed;
    apartmentModel.numberOfRoom = validateData.numberOfRoom;

    (apartmentModel.location = GoogleMapMapper.toModel(
      apartment.getGoogleMapLocation()
    )),
      (apartmentModel.photos = apartment
        .getApartmentPhotoDocument()
        .map((file) => apartmentPhotoMapper.toModel(file)));

    const apartmentDoc = apartment.getApartmentDocument();

    if (!apartmentDoc) apartmentModel.documents = null;

    return apartmentModel;
  }

  public static modelValidation(apartment: ApartmentAggregateRoot) {
    const price = apartment.getApartmentPrice();
    const numberOfBed = apartment.getNumberOfBed();
    const numberOfRoom = apartment.getNumberOfRoom();

    const document = apartment.getApartmentDocument();

    if (!price) throw new Error("Cannot save apartment, price is require !! ");
    if (!numberOfBed)
      throw new Error("Cannot save apartment, number of bed is require !!");
    if (!numberOfRoom)
      throw new Error("Cannot save apartment , number of room is require !!");

    return { price, numberOfBed, numberOfRoom };
  }

  public static toEntity(model: ApartmentModel): ApartmentAggregateRoot {
    return new ApartmentAggregateRoot({
      apartmentId: model.apartmentId,
      isVisible: model.isVisible,
      title: model.title,
      description: model.description,
      address: model.address,
      IsVerified: model.isVerified,
      isJoin: model.isJoin,
      createAt: model.createAt,
      updateAt: model.updateAt,

      // Value Objects
      numberOfBed: new NumberOfBed(model.numberOfBed),
      numberOfRoom: new NumberOfRoom(model.numberOfRoom),
      price: new ApartmentPrice(model.price),

      // Relationships
      landlordId: model.landlordId,
      googleMapLocation: GoogleMapMapper.toEntity(model.location),

      apartmentDocument: model.documents
        ? ApartmentDocumentMapper.toEntity(model.documents)
        : null,

      apartmentPhoto: model.photos
        ? model.photos.map((file) => apartmentPhotoMapper.toEntity(file))
        : [],
    });
  }

  public static toResponsesSimple(model: ApartmentModel): IApartmentSimpleDTO {
    return {
      apartmentId: model.apartmentId,
      isVisible: model.isVisible,
      title: model.title,
      description: model.description,
      address: model.address,
      isVerified: model.isVerified,
      isJoin: model.isJoin,
      numberOfBed: model.numberOfBed,
      numberOfRoom: model.numberOfRoom,
      price: model.price,
      landlordName: model.landlord.user.Name,
      landlordId: model.landlordId,
      apartmentPhoto: model.photos
        ? model.photos.map((file) => apartmentPhotoMapper.toEntity(file))
        : [],

      apartmentDocuments: model.documents
        ? ApartmentDocumentMapper.toEntity(model.documents)
        : null,

      googleMapLocation: GoogleMapMapper.toEntity(model.location),
    };
  }

  public static toResponsesDetail(model: ApartmentModel): IApartmentDTO {
    return {
      apartmentId: model.apartmentId,
      isVisible: model.isVisible,
      title: model.title,
      description: model.description,
      address: model.address,
      isVerified: model.isVerified,
      isJoin: model.isJoin,
      numberOfBed: model.numberOfBed,
      numberOfRoom: model.numberOfRoom,
      price: model.price,
      createAt: model.createAt,
      updateAt: model.updateAt,
      googleMapLocation: GoogleMapMapper.toEntity(model.location),
      landlordName: model.landlord.user.Name,
      
      apartmentDocument: model.documents
        ? ApartmentDocumentMapper.toEntity(model.documents)
        : null,

      apartmentPhoto: model.photos
        ? model.photos.map((file) => apartmentPhotoMapper.toEntity(file))
        : [],
    };
  }
}
