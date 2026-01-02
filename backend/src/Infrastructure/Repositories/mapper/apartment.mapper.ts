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
      (apartmentModel.isFullyBooked = apartment.getIsFullyBooked()),
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
      isVisible: model.isVisible,
      title: model.title,
      description: model.description,
      address: model.address,
      IsVerified: model.isVerified,
      isFullyBooked: model.isFullyBooked,
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
      isVisible: model.isVisible,
      title: model.title,
      description: model.description,
      address: model.address,
      isVerified: model.isVerified,
      isFullyBooked: model.isFullyBooked,
      isJoin: model.isJoin,
      numberOfBed: model.numberOfBed,
      numberOfRoom: model.numberOfRoom,
      price: model.price,
      landlordName: model.landlord.user.Name,
      landlordId: model.landlordId,
      apartmentPhoto: model.photos
        ? model.photos.map((file) => apartmentPhotoMapper.toEntity(file))
        : [],
      googleMapLocation: GoogleMapMapper.toEntity(model.location),
    };
  }

  /**
   * 
   * @param model   apartmentId: string;
     isVisible: boolean;
     title: string;
     description: string;
     address: string;
     isVerified: boolean;
     isFullyBooked: boolean;
     isJoin: boolean;
     numberOfBed: string;
     numberOfRoom: string;
     price: string;
     landlordId: string;
     landlordName: string;
     apartmentPhoto: ApartmentPhotoDocumentEntity[];
     googleMapLocation: GoogleMapLocationEntity;
   * @returns 
   */

  public static toResponsesDetail(model: ApartmentModel): IApartmentDTO {
    return {
      apartmentId: model.apartmentId,
      isVisible: model.isVisible,
      title: model.title,
      description: model.description,
      address: model.address,
      isVerified: model.isVerified,
      isFullyBooked: model.isFullyBooked,
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
