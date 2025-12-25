import {
  IApartmentDTO,
  IApartmentSimpleDTO,
} from "../../../Application/DTO/admin/ApartmentDTo.dtos";
import { ApartmentAggregateRoot } from "../../../Domain/AggregatesRoot/apartmentEntity.entity";
import { ApartmentPrice } from "../../../Domain/Value-Object/ApartmentPrice.vo";
import { numberOfBed } from "../../../Domain/Value-Object/NumberOfBed.vo";
import { NumberOfRoom } from "../../../Domain/Value-Object/NumberOfRoom.vo";
import { ApartmentModel } from "../../Database/orm/TypeOrm/entity/Apartment.entity";
import { ApartmentDocumentMapper } from "./apartmentDocument.mapper";
import { apartmentPhotoMapper } from "./apartmentPhoto.mapper";
import { GoogleMapMapper } from "./gogleMap.mapper";
import { LandlordMapper } from "./landloard.mapper";

export class ApartmentMapper {
  public static toModel(apartment: ApartmentAggregateRoot): ApartmentModel {
    const apartmentModel = new ApartmentModel();
    const validateData = this.modelValidation(apartment);

    (apartmentModel.apartmentId = apartment.getApartmentId()),
      (apartmentModel.propertyStatus = apartment.getPropertyStatus()),
      (apartmentModel.title = apartment.getTitle()),
      (apartmentModel.description = apartment.getDescription()),
      (apartmentModel.address = apartment.getAddress()),
      (apartmentModel.Verified = apartment.getVerified()),
      (apartmentModel.isJoin = apartment.getIsJoin()),
      (apartmentModel.createAt = apartment.getCreateAt()),
      (apartmentModel.updateAt = apartment.getUpdateAt()),
      (apartmentModel.isFully = apartment.getFully()),
      (apartmentModel.landlord = LandlordMapper.toOrm(apartment.getLandlord()));
    apartmentModel.price = validateData.price;
    apartmentModel.numberOfBed = validateData.numberOfBed;
    apartmentModel.numberOfRoom = validateData.numberOfRoom;

    (apartmentModel.location = GoogleMapMapper.toModel(
      apartment.getGoogleMapLocation()
    )),
      (apartmentModel.photos = apartment
        .getApartmentPhotoDocument()
        .map((file) => apartmentPhotoMapper.toModel(file)));

    apartmentModel.documents = apartment
      .getApartmentDocument()
      .map((doc) => ApartmentDocumentMapper.toModel(doc));

    return apartmentModel;
  }

  public static modelValidation(apartment: ApartmentAggregateRoot) {
    const price = apartment.getApartmentPrice();
    const numberOfBed = apartment.getNumberOfBed();
    const numberOfRoom = apartment.getNumberOfRoom();

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
      propertyStatus: model.propertyStatus,
      title: model.title,
      description: model.description,
      address: model.address,
      Verified: model.Verified,
      isFully: model.isFully,
      isJoin: model.isJoin,
      createAt: model.createAt,
      updateAt: model.updateAt,

      // Value Objects
      numberOfBed: new numberOfBed(model.numberOfBed),
      numberOfRoom: new NumberOfRoom(model.numberOfRoom),
      price: new ApartmentPrice(model.price),

      // Relationships
      landlord: LandlordMapper.toEntity(model.landlord),
      googleMapLocation: GoogleMapMapper.toEntity(model.location),

      apartmentDocument: model.documents
        ? model.documents.map((doc) => ApartmentDocumentMapper.toEntity(doc))
        : [],

      apartmentPhoto: model.photos
        ? model.photos.map((file) => apartmentPhotoMapper.toEntity(file))
        : [],
    });
  }

  public static toResponsesSimple(model: ApartmentModel): IApartmentSimpleDTO {
    return {
      apartmentId: model.apartmentId,
      propertyStatus: model.propertyStatus,
      title: model.title,
      description: model.description,
      address: model.address,
      Verified: model.Verified,
      isFully: model.isFully,
      isJoin: model.isJoin,
      numberOfBed: model.numberOfBed,
      numberOfRoom: model.numberOfRoom,
      price: model.price,

      landlordName: model.landlord.user.Name,
      apartmentPhoto: model.photos
        ? model.photos.map((file) => apartmentPhotoMapper.toEntity(file))
        : [],
    };
  }

  public static toResponsesDetail(model: ApartmentModel): IApartmentDTO {
    return {
      apartmentId: model.apartmentId,
      propertyStatus: model.propertyStatus,
      title: model.title,
      description: model.description,
      address: model.address,
      Verified: model.Verified,
      isFully: model.isFully,
      isJoin: model.isJoin,
      numberOfBed: model.numberOfBed,
      numberOfRoom: model.numberOfRoom,
      price: model.price,
      createAt: model.createAt,
      updateAt: model.updateAt,
      googleMapLocation: GoogleMapMapper.toEntity(model.location),
      landlordName: model.landlord.user.Name,

      apartmentPhoto: model.photos
        ? model.photos.map((file) => apartmentPhotoMapper.toEntity(file))
        : [],
      apartmentDocument: model.documents
        ? model.documents.map((doc) => ApartmentDocumentMapper.toEntity(doc))
        : [],
    };
  }
}

/**
 * no id
 * jameel missed description
 * is fully
 *
 * no create at,update at ,
 * no google map locations
 *
 * one photo
 *
 */
