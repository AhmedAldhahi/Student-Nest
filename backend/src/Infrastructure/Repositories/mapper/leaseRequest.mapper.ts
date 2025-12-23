import { ILeaseRequestDTO } from "../../../Application/Dtos/admin/LeaseRequestDTO.dtos";
import { LeaseRequestEntity } from "../../../Domain/Entities/leaseRequestEntity.entity";
import { LeaseStartDate } from "../../../Domain/Value-Object/LeaseStartDate.vo";
import { RentTerm } from "../../../Domain/Value-Object/RentTerm.vo";
import { LeaseRequestModel } from "../../Database/orm/TypeOrm/entity/LeaseRequest";
import { ApartmentMapper } from "./apartment.mapper";
import { LandlordMapper } from "./landloard.mapper";
import { StudentMapper } from "./student.mapper";

export class LeaseRequestMapper {
  public static toModel(entity: LeaseRequestEntity): LeaseRequestModel {
    const leaseRequestModel = new LeaseRequestModel();
    const dataValidation = this.toModelValidation(entity);

    leaseRequestModel.createAt = entity.getCreateAt();
    leaseRequestModel.landlord = LandlordMapper.toOrm(entity.getLandlord());
    leaseRequestModel.student = StudentMapper.toModel(entity.getStudent());
    leaseRequestModel.apartment = ApartmentMapper.toModel(entity.getApartment())

    leaseRequestModel.leaseRequestId = entity.getRequestLeaseId();
    leaseRequestModel.rentTerm = dataValidation.rentTerm;
    leaseRequestModel.requestMessage = entity.getRequestMessage();
    leaseRequestModel.startDate = dataValidation.startDate;
    leaseRequestModel.requestStatus = entity.getRequestLeaseStatus();

    return leaseRequestModel;
  }

  private static toModelValidation(leaseReq: LeaseRequestEntity) {
    const rentTerm = leaseReq.getRentTerm();
    const startDate = leaseReq.getStartDate();

    if (!rentTerm)
      throw new Error("Cannot save lease request, rent term is require !!");
    if (!startDate)
      throw new Error("Cannot save lease request, start date is require !!");

    return { rentTerm, startDate };
  }

  public static toEntity(model: LeaseRequestModel): LeaseRequestEntity {
    return new LeaseRequestEntity({
      requestLeaseId: model.leaseRequestId,
      requestMessage: model.requestMessage,
      startDate: new LeaseStartDate(model.startDate),
      rentTerm: new RentTerm(model.rentTerm),
      requestStatus: model.requestStatus,
      createAt: model.createAt,
      studentName: StudentMapper.toEntity(model.student),
      landlordName: LandlordMapper.toEntity(model.landlord),
      apartment: ApartmentMapper.toEntity(model.apartment),
    });
  }

  public static toResponse(model: LeaseRequestModel): ILeaseRequestDTO {
    return {
      requestLeaseId: model.leaseRequestId,
      requestMessage: model.requestMessage,
      startDate: model.startDate,
      rentTerm: model.rentTerm,
      requestStatus: model.requestStatus,
      createAt: model.createAt,
      studentName: StudentMapper.toResponse(model.student).user.name,
      landlordName: LandlordMapper.toResponse(model.landlord).user.name,
      apartmentTitle: ApartmentMapper.toResponses(model.apartment).title,
      apartmentPrice: ApartmentMapper.toResponses(model.apartment).price,
      Major: StudentMapper.toResponse(model.student).Major,
    };
  }
}
