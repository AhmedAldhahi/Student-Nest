import { LeaseAggregateRoot } from "../../../Domain/BoundedContexts/Leases/AgregateRoot/leaseEntity.entity";
import { MonthlyRent } from "../../../Domain/BoundedContexts/Housing/Value-Object/MonthlyRent.vo";
import { LeaseModel } from "../../Database/TypeOrm/entity/Lease.entity";
import { LeaseEndDate } from "../../../Domain/BoundedContexts/Leases/Value-Object/LeaseEndDate.vo";
import { LeaseStartDate } from "../../../Domain/BoundedContexts/Leases/Value-Object/LeaseStartDate.vo";
import { LeaseTerm } from "../../../Domain/BoundedContexts/Leases/Value-Object/LeaseTerm.vo";
import { PaymentMapper } from "./payment.mapper";
import { ILeaseEntityDTO } from "../../../Domain/BoundedContexts/Leases/Representations/ILeaseEntityDTO";

export class LeaseMapper {
  public static toEntity(model: LeaseModel): LeaseAggregateRoot {
    const normalizedStart = this.toDomainDate(model.leaseStartDate);
    const normalizedEnd = this.toDomainDate(model.leaseEndDate);

    const startD = new LeaseStartDate(normalizedStart);
    const lastD = new LeaseEndDate(normalizedEnd);

    const paymentAggregates = (model.payments || []).map((p) =>
      PaymentMapper.toDomain(p)
    );

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
      apartmentId: model.apartmentId, // Note: Checked this, it was model.landlordId before, assumed apartmentId
      includeUtilities: model.includeUtilities ?? undefined,
      createAt: model.createAt,
      paymentSchedule: paymentAggregates,
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
      studentName: model.student?.user?.Name, // Safety check ?
      landlordName: model.landlord?.user?.Name, // Safety check ?
      apartmentTitle: model.apartment?.title, // Safety check ?
      apartmentId: model.apartment?.apartmentId, // Safety check ?
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
    leaseModel.studentId = entity.getStudent();
    leaseModel.landlordId = entity.getLandlord();
    leaseModel.apartmentId = entity.getApartment();
    leaseModel.createAt = entity.getCreateAt();

    leaseModel.payments = (entity.getPaymentSchedule() || []).map(
      (paymentAggregate) => PaymentMapper.toModel(paymentAggregate)
    );

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

  private static toDomainDate(dateStr: string | Date): string {
    // If it's already a Date object (sometimes TypeORM does this)
    if (dateStr instanceof Date) {
      const day = String(dateStr.getDate()).padStart(2, "0");
      const month = String(dateStr.getMonth() + 1).padStart(2, "0");
      const year = dateStr.getFullYear();
      return `${day}-${month}-${year}`;
    }

    if (typeof dateStr === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [year, month, day] = dateStr.split("-");
      return `${day}-${month}-${year}`;
    }

    return dateStr as string;
  }
}
