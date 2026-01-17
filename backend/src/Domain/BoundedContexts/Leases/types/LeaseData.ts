import { MonthlyRent } from "../../Housing/Value-Object/MonthlyRent.vo";
import { PaymentAggregateRoot } from "../../Payment/AgregateRoot/Payment.AgregateRoot";
import { LeaseEndDate } from "../Value-Object/LeaseEndDate.vo";
import { LeaseStartDate } from "../Value-Object/LeaseStartDate.vo";
import { LeaseTerm } from "../Value-Object/LeaseTerm.vo";

export type LeaseDataType = {
  leaseId: string;
  houseRule: string;
  isLandlordSigned: boolean;
  isStudentSigned: boolean;
  ActivationStatus: boolean;
  includeUtilities?: string;
  leaseStartData: LeaseStartDate;
  leaseEndData: LeaseEndDate;
  monthlyRent: MonthlyRent;
  leaseTerm: LeaseTerm;

  apartmentId: string;
  studentId: string;
  landlordId: string;
  createAt: Date;
  paymentSchedule: PaymentAggregateRoot[] | null;
};


