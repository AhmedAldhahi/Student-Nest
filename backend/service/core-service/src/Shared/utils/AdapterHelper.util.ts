import { ApartmentPrice } from "../../Domain/BoundedContexts/Housing/Value-Object/ApartmentPrice.vo";
import { MonthlyRent } from "../../Domain/BoundedContexts/Housing/Value-Object/MonthlyRent.vo";
import { LeaseAggregateRoot } from "../../Domain/BoundedContexts/Leases/AgregateRoot/leaseEntity.entity";
import { LeaseRequestEntity } from "../../Domain/BoundedContexts/Leases/Entities/leaseRequestEntity.entity";
import { LeaseRequestStatus } from "../../Domain/BoundedContexts/Leases/Enum/LeaseRequestStatus.enum";
import { ILeaseEntityDTO } from "../../Domain/BoundedContexts/Leases/Representations/ILeaseEntityDTO";
import { ILeaseRequestDTO } from "../../Domain/BoundedContexts/Leases/Representations/ILeaseRequestDTO";
import { LeaseEndDate } from "../../Domain/BoundedContexts/Leases/Value-Object/LeaseEndDate.vo";
import { LeaseStartDate } from "../../Domain/BoundedContexts/Leases/Value-Object/LeaseStartDate.vo";
import { LeaseTerm } from "../../Domain/BoundedContexts/Leases/Value-Object/LeaseTerm.vo";
import { RentTerm } from "../../Domain/BoundedContexts/Leases/Value-Object/RentTerm.vo";

export class AdapterHelper {
  public static CalculateEndDate(
    startDate: LeaseStartDate,
    term: RentTerm,
  ): LeaseEndDate {
    const startDay = startDate.getDays();
    const startMonth = startDate.getMonth();
    const startYear = startDate.getYear();

    const dateObj = new Date(startYear, startMonth - 1, startDay);

    const termValue = term.getValue();
    if (!termValue) throw new Error("Rent Term is missing");

    const [termDays, termMonths, termYears] = termValue
      .split(/[-/.,]/)
      .map(Number);

    dateObj.setFullYear(dateObj.getFullYear() + termYears);
    dateObj.setMonth(dateObj.getMonth() + termMonths);
    dateObj.setDate(dateObj.getDate() + termDays);

    const endDay = String(dateObj.getDate()).padStart(2, "0");
    const endMonth = String(dateObj.getMonth() + 1).padStart(2, "0");
    const endYear = dateObj.getFullYear();

    const endDateString = `${endDay}-${endMonth}-${endYear}`;

    return LeaseEndDate.create(endDateString);
  }

  public static StartDateLeaseRequestToStartLeaseDate(
    date: Date,
  ): LeaseStartDate {
    if (!date) throw new Error("Start date is required");

    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();

    const dateStr = `${d}-${m}-${y}`;

    return LeaseStartDate.create(dateStr);
  }

  public static FromILeaseRequestDTOToLeaseRequestEntity(
    dto: ILeaseRequestDTO,
  ): LeaseRequestEntity {
    return new LeaseRequestEntity({
      requestLeaseId: dto.requestLeaseId,
      requestMessage: dto.requestMessage,

      startDate: LeaseStartDate.create(dto.startDate),
      rentTerm: RentTerm.create(dto.rentTerm),

      requestStatus: dto.requestStatus as LeaseRequestStatus,

      createAt: new Date(dto.createAt),

      landlordId: dto.landlordId,
      apartmentId: dto.apartmentId,
      studentId: dto.studentId,
    });
  }
}
