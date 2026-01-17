import { LeaseRequestStatus } from "../../../../../Domain/BoundedContexts/Leases/Enum/LeaseRequestStatus.enum";

export interface AddLeaseRequest {
  requestLeaseId:string;
  requestMessage: string;
  startDate: string;
  rentTerm: string;
  requestStatus: LeaseRequestStatus;
  createAt: Date;
  studentId: string;
  landlordId: string;
  apartmentId: string;
}
