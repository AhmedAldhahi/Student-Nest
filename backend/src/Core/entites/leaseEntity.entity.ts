export interface ILeaseData {
  leaseId: number;

  leaseStartData: Date;
  leaseEndData: Date;
  monthlyRent: number;
  includeUtilities?: string;
  houseRule: string;
  leaseTerm: string;

  isLandlordSigned: boolean;
  isStudentSigned: boolean;
  ActivationStatus: boolean;

  //student id  fk
  // landlord id fk
  // apartment id fk
}

export class LeaseEntity { 
  private leaseId: number;
  private activateStatus: boolean = false;
  private isLandlordSigned: boolean;
  private isStudentSigned: boolean;

  constructor(data: ILeaseData) {
    this.leaseId = data.leaseId;
    this.activateStatus = data.ActivationStatus;
    this.isLandlordSigned = data.isLandlordSigned;
    this.isStudentSigned = data.isStudentSigned;
  }

  public setLeaseId(id: number): void {
    this.leaseId = id;
  }

  public getLeaseId(): number {
    return this.leaseId;
  }

  public markAsActivated(): void {
    this.activateStatus = true;
  }

  public resetActivated(): void {
    this.activateStatus = false;
  }

  public getActivated(): boolean {
    return this.activateStatus;
  }

  public markLandlordAsSigned(): void {
    this.isLandlordSigned = true;
  }

  public resetLandlordSigned(): void {
    this.isLandlordSigned = false;
  }

  public getIsLandlordSigned(): boolean {
    return this.isLandlordSigned;
  }

  public markStudentLandlordSigned(): void {
    this.isStudentSigned = true;
  }

  public resetStudentSigned(): void {
    this.isStudentSigned = false;
  }

  public getIsStudentSigned(): boolean {
    return this.isStudentSigned;
  }
}
