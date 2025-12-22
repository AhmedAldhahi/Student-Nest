import { ILeaseEntityDTO } from "../../../Application/Dtos/admin/LeaseDTO.dtos";
import { LeaseAggregateRoot } from "../../../Domain/AggregatesRoot/leaseEntity.entity";
import { LeaseEndDate } from "../../../Domain/Value-Object/LeaseEndDate.vo";
import { LeaseStartDate } from "../../../Domain/Value-Object/LeaseStartDate.vo";
import { LeaseTerm } from "../../../Domain/Value-Object/LeaseTerm.vo";
import { MonthlyRent } from "../../../Domain/Value-Object/MonthlyRent.vo";
import { LeaseModel } from "../../Database/orm/TypeOrm/entity/Lease.entity";
import { LandlordMapper } from "./landloard.mapper";
import { StudentMapper } from "./student.mapper";

export class LeaseMapper {
  public static toEntity(model: LeaseModel): LeaseAggregateRoot {
    const startD = new LeaseStartDate(model.leaseStartDate);
    const lastD = new LeaseEndDate(model.leaseEndDate);

    return new LeaseAggregateRoot({
      leaseId: model.leaseId,
      ActivationStatus: model.LeaseActivationStatus,
      isLandlordSigned: model.isLandlordSigned,
      isStudentSigned: model.isStudentSigned,
      houseRule: model.houseRule,
      leaseStartData: startD,
      leaseEndData: lastD,
      monthlyRent: new MonthlyRent(model.monthlyRent),
      leaseTerm: new LeaseTerm(model.leaseTerm),
      student: StudentMapper.toEntity(model.student),
      landlord: LandlordMapper.toEntity(model.landlord),
      includeUtilities: model.includeUtilities ?? undefined, // optional
      createAt: model.createAt,
    });
  }

  public static toResponse(model: LeaseModel): ILeaseEntityDTO {
    return {
      leaseId: model.leaseId,
      LeaseActivationStatus: model.LeaseActivationStatus,
      isLandlordSigned: model.isLandlordSigned,
      isStudentSigned: model.isStudentSigned,
      houseRule: model.houseRule,
      leaseStartDate: model.leaseStartDate,
      leaseEndDate: model.leaseEndDate,
      monthlyRent: model.monthlyRent,
      leaseTerm: model.leaseTerm,
      includeUtilities: model.includeUtilities ?? undefined,
      createAt: model.createAt,
      studentName: model.student.user.Name,
      landlordName: model.landlord.user.Name,
    };
  }

  public static toModel(entity: LeaseAggregateRoot): LeaseModel {
    const leaseModel = new LeaseModel();
    const dataValidation = this.toModelValidation(entity);
    const utilities = entity.getIncludeUtilities();

    leaseModel.leaseId = entity.getLeaseId();
    leaseModel.LeaseActivationStatus = entity.getActivated();
    leaseModel.isLandlordSigned = entity.getIsLandlordSigned();
    leaseModel.isStudentSigned = entity.getIsStudentSigned();
    leaseModel.houseRule = entity.getHouseRule();
    leaseModel.leaseStartDate = dataValidation.leaseStartDate;
    leaseModel.leaseEndDate = dataValidation.leaseEndDate;
    leaseModel.monthlyRent = dataValidation.monthlyRent;
    leaseModel.leaseTerm = entity.getLeaseTerm();
    leaseModel.includeUtilities = utilities ?? null;
    leaseModel.student = StudentMapper.toModel(entity.getStudent());
    leaseModel.landlord = LandlordMapper.toOrm(entity.getLandlord());
    leaseModel.createAt = entity.getCreateAt();

    return leaseModel;
  }

  private static toModelValidation(lease: LeaseAggregateRoot) {
    const leaseStartDate = lease.getLeaseStartDate();
    const leaseEndDate = lease.getLeaseEndDate();
    const monthlyRent = lease.getMonthlyRent();

    if (!leaseStartDate)
      throw new Error("Cannot save lease, lease start date is require !!");

    if (!leaseEndDate)
      throw new Error("Cannot save lease, lease end date is require!!");

    if (!monthlyRent)
      throw new Error("Cannot save lease, monthly rent is require !!");

    return { leaseEndDate, leaseStartDate, monthlyRent };
  }
}
