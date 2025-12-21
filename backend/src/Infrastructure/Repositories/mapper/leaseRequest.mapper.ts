import { ILeaseRequestDTO } from "../../../Application/Dtos/admin/LeaseRequestDTO.dtos";
import { LeaseRequestEntity } from "../../../Domain/Entities/leaseRequest.entity";
import { LeaseStartDate } from "../../../Domain/Value-Object/LeaseStartDate.vo";
import { RentTerm } from "../../../Domain/Value-Object/RentTerm.vo";
import { LeaseRequestModel } from "../../Database/orm/TypeOrm/entity/LeaseRequest";
import { LandlordMapper } from "./landloard.mapper";
import { StudentMapper } from "./student.mapper";

export class LeaseRequestMapper {
  public static toModel(entity: LeaseRequestEntity): LeaseRequestModel {
    const leaseRequestModel = new LeaseRequestModel();

    leaseRequestModel.createAt = entity.getCreateAt();
    leaseRequestModel.landlord = LandlordMapper.toOrm(entity.getLandlord());
    leaseRequestModel.student = StudentMapper.toModel(entity.getStudent());

    leaseRequestModel.leaseRequestId = entity.getRequestLeaseId();
    leaseRequestModel.rentTerm = entity.getRentTerm();
    leaseRequestModel.requestMessage = entity.getRequestMessage();
    leaseRequestModel.startDate = entity.getStartDate();
    leaseRequestModel.requestStatus = entity.getRequestLeaseStatus();

    return leaseRequestModel;
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
    });
  }

  public static toResponse(model: LeaseRequestModel): ILeaseRequestDTO {
    return {
      requestLeaseId: model.leaseRequestId,
      requestMessage: model.requestMessage,
      startDate: new LeaseStartDate(model.startDate).getValue(),
      rentTerm: new RentTerm(model.rentTerm).getValue(),
      requestStatus: model.requestStatus,
      createAt: model.createAt,
      studentName: StudentMapper.toEntity(model.student).getUser().getName(),
      landlordName: LandlordMapper.toEntity(model.landlord).getUser().getName(),
      Major: StudentMapper.toEntity(model.student).getMajor(),
    };
  }
}
