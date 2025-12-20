import { ILeaseEntityDTO } from "../../../Application/Dtos/admin/LeaseDTO.dtos";
import { LeaseEntity } from "../../../Domain/Entities/leaseEntity.entity";
import { LeaseEndDate } from "../../../Domain/Value-Object/LeaseEndDate.vo";
import { LeaseStartDate } from "../../../Domain/Value-Object/LeaseStartDate.vo";
import { LeaseTerm } from "../../../Domain/Value-Object/LeaseTerm.vo";
import { MonthlyRent } from "../../../Domain/Value-Object/MonthlyRent.vo";
import { LeaseModel } from "../../Database/orm/TypeOrm/entity/Lease.entity";
import { LandlordMapper } from "./landloard.mapper";
import { StudentMapper } from "./student.mapper";

export class LeaseMapper {
  public static toEntity(model: LeaseModel): LeaseEntity {
    const startD = new LeaseStartDate(model.leaseStartDate);
    const lastD = new LeaseEndDate(model.leaseEndDate);

    return new LeaseEntity({
      leaseId: model.leaseId,
      ActivationStatus: model.LeaseActivationStatus,
      isLandlordSigned: model.isLandlordSigned,
      isStudentSigned: model.isStudentSigned,
      houseRule: model.houseRule,
      leaseStartData: startD,
      leaseEndData: lastD,
      monthlyRent: new MonthlyRent(model.monthlyRent),
      leaseTerm: new LeaseTerm(startD, lastD),
      student: StudentMapper.toEntity(model.student),
      landlord: LandlordMapper.toEntity(model.landlord),
      includeUtilities: model.includeUtilities ?? undefined, // optional
      createAt: model.createAt,
    });
  }

  public static toResponse(model: LeaseModel): ILeaseEntityDTO {
    const startD = new LeaseStartDate(model.leaseStartDate);
    const lastD = new LeaseEndDate(model.leaseEndDate);

    return {
      leaseId: model.leaseId,
      LeaseActivationStatus: model.LeaseActivationStatus,
      isLandlordSigned: model.isLandlordSigned,
      isStudentSigned: model.isStudentSigned,
      houseRule: model.houseRule,
      leaseStartDate: startD.getValue(),
      leaseEndDate: lastD.getValue(),
      monthlyRent: new MonthlyRent(model.monthlyRent).getValue(),
      leaseTerm: new LeaseTerm(startD, lastD).getValue(),
      includeUtilities: model.includeUtilities ?? undefined, // optional
      createAt: model.createAt,
      studentName: StudentMapper.toEntity(model.student).getUser().getName(),
      landlordName: LandlordMapper.toEntity(model.landlord).getUser().getName(),
    };
  }

  public static toModel(entity: LeaseEntity): LeaseModel {
    const leaseModel = new LeaseModel();
    const utilities = entity.getIncludeUtilities();

    leaseModel.leaseId = entity.getLeaseId();
    leaseModel.LeaseActivationStatus = entity.getActivated();
    leaseModel.isLandlordSigned = entity.getIsLandlordSigned();
    leaseModel.isStudentSigned = entity.getIsStudentSigned();
    leaseModel.houseRule = entity.getHouseRule();
    leaseModel.leaseStartDate = entity.getLeaseStartDate();
    leaseModel.leaseEndDate = entity.getLeaseEndDate();
    leaseModel.monthlyRent = entity.getMonthlyRent();
    leaseModel.leaseTerm = entity.getLeaseTerm();
    leaseModel.includeUtilities = utilities ?? null;
    leaseModel.student = StudentMapper.toModel(entity.getStudent());
    leaseModel.landlord = LandlordMapper.toOrm(entity.getLandlord());
    leaseModel.createAt = entity.getCreateAt();

    return leaseModel;
  }
}
