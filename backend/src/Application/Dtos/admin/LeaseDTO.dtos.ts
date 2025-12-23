export interface ILeaseEntityDTO {
  leaseId: number;
  LeaseActivationStatus: boolean;
  isLandlordSigned: boolean;
  isStudentSigned: boolean;
  houseRule: string;
  leaseStartDate: string;
  leaseEndDate: string;
  monthlyRent: string;
  leaseTerm: string;
  includeUtilities?: string;
  createAt: Date;
  landlordName: string;
  studentName: string;
  apartmentTitle: string;
}
