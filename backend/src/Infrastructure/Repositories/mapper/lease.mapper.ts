import { ILeaseEntityDTO } from "../../../Application/DTO/admin/LeaseDTO.dto";
import { LeaseAggregateRoot } from "../../../Domain/Modules/Leases/AgregateRoot/leaseEntity.entity";
import { MonthlyRent } from "../../../Domain/Modules/Housing/Value-Object/MonthlyRent.vo";
import { LeaseModel } from "../../Database/orm/TypeOrm/entity/Lease.entity";
import { LeaseEndDate } from "../../../Domain/Modules/Leases/Value-Object/LeaseEndDate.vo";
import { LeaseStartDate } from "../../../Domain/Modules/Leases/Value-Object/LeaseStartDate.vo";
import { LeaseTerm } from "../../../Domain/Modules/Leases/Value-Object/LeaseTerm.vo";

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
      studentId: model.studentId,
      landlordId: model.landlordId,
      apartmentId: model.landlordId,
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
      apartmentTitle: model.apartment.title,
      apartmentId: model.apartment.apartmentId,
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
    leaseModel.leaseTerm = dataValidation.leaseTerm;
    leaseModel.includeUtilities = utilities ?? null;
    leaseModel.studentId = entity.getStudent(),
    leaseModel.landlordId = entity.getLandlord(),
    leaseModel.apartmentId = entity.getApartment();
    leaseModel.createAt = entity.getCreateAt();

    return leaseModel;
  }

  private static toModelValidation(lease: LeaseAggregateRoot) {
    const leaseStartDate = lease.getLeaseStartDate();
    const leaseEndDate = lease.getLeaseEndDate();
    const monthlyRent = lease.getMonthlyRent();
    const leaseTerm = lease.getLeaseTerm();

    if (!leaseTerm)
      throw new Error("Cannot save lease, lease term is require !!");

    if (!leaseStartDate)
      throw new Error("Cannot save lease, lease start date is require !!");

    if (!leaseEndDate)
      throw new Error("Cannot save lease, lease end date is require!!");

    if (!monthlyRent)
      throw new Error("Cannot save lease, monthly rent is require !!");

    return { leaseEndDate, leaseStartDate, monthlyRent, leaseTerm };
  }
}
