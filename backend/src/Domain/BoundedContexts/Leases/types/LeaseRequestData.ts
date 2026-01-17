import { LeaseRequestStatus } from "../Enum/LeaseRequestStatus.enum";
import { LeaseStartDate } from "../Value-Object/LeaseStartDate.vo";
import { RentTerm } from "../Value-Object/RentTerm.vo";

export type LeaseRequestDate = {
  requestLeaseId: string;
  requestMessage: string;
  startDate: LeaseStartDate;
  rentTerm: RentTerm;
  requestStatus: LeaseRequestStatus;
  createAt: Date;
  studentId: string;
  landlordId: string;
  apartmentId: string;
};
