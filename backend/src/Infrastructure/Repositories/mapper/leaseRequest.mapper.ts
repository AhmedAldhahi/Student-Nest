import { ILeaseRequestDTO } from "../../../Application/DTO/admin/LeaseRequestDTO.dto";
import { LeaseRequestEntity } from "../../../Domain/Modules/Leases/Entities/leaseRequestEntity.entity";
import { LeaseStartDate } from "../../../Domain/Modules/Leases/Value-Object/LeaseStartDate.vo";
import { RentTerm } from "../../../Domain/Modules/Leases/Value-Object/RentTerm.vo";

import { LeaseRequestModel } from "../../Database/orm/TypeOrm/entity/LeaseRequest";
import { ApartmentMapper } from "./apartment.mapper";
import { LandlordMapper } from "./landloard.mapper";
import { StudentMapper } from "./student.mapper";

export class LeaseRequestMapper {
  public static toModel(entity: LeaseRequestEntity): LeaseRequestModel {
    const leaseRequestModel = new LeaseRequestModel();
    const dataValidation = this.toModelValidation(entity);

    leaseRequestModel.createAt = entity.getCreateAt();
    leaseRequestModel.landlordId = entity.getLandlord();
    leaseRequestModel.studentId = entity.getStudent();
    leaseRequestModel.apartmentId = entity.getApartment();

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
      studentName: model.student.user.Name,
      landlordName: model.landlord.user.Name,
      apartment: model.apartment.title,
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
      studentName: model.student.user.Name,
      landlordName: model.landlord.user.Name,
      apartmentTitle: model.apartment.title,
      apartmentPrice: model.apartment.price,
      Major: model.student.Major,
    };
  }
}
