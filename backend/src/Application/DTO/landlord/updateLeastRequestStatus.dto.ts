import { LeaseRequestStatus } from "../../../Domain/Shared/Enum/LeaseRequestStatus.enum";

export interface UpdateLeaseRequestStatusRequest {
    status: LeaseRequestStatus
}