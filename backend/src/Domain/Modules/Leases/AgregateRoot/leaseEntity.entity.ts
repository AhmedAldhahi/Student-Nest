import { MonthlyRent } from "../../Housing/Value-Object/MonthlyRent.vo";
import { LeaseEndDate } from "../Value-Object/LeaseEndDate.vo";
import { LeaseStartDate } from "../Value-Object/LeaseStartDate.vo";
import { LeaseTerm } from "../Value-Object/LeaseTerm.vo";

export interface ILeaseData {
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
}

export class LeaseAggregateRoot {
  private leaseId: string;
  private isLandlordSigned: boolean;
  private isStudentSigned: boolean;
  private houseRule: string;
  private includeUtilities?: string;
  private leaseStartData: LeaseStartDate;
  private leaseEndData: LeaseEndDate;
  private monthlyRent: MonthlyRent;
  private leaseTerm: LeaseTerm;

  private apartmentId: string;
  private studentId: string;
  private landlordId: string;

  private createAt: Date;
  private activateStatus: boolean = true;

  constructor(data: ILeaseData) {
    this.leaseId = data.leaseId;
    this.activateStatus = data.ActivationStatus;
    this.isLandlordSigned = data.isLandlordSigned;
    this.houseRule = data.houseRule;
    this.isStudentSigned = data.isStudentSigned;
    this.leaseStartData = data.leaseStartData;
    this.leaseEndData = data.leaseEndData;
    this.monthlyRent = data.monthlyRent;
    this.leaseTerm = data.leaseTerm;
    this.studentId = data.studentId;
    this.landlordId = data.landlordId;
    this.apartmentId = data.apartmentId;
    this.createAt = data.createAt;
  }

  public getCreateAt(): Date {
    return this.createAt;
  }

  public updateStatus(status: boolean) {
    this.activateStatus = status;
  }

  public getStatus(): boolean {
    return this.activateStatus;
  }

  public ActivateStatus(): void {
    this.activateStatus = true;
  }

  public DeactivateStatus(): void {
    this.activateStatus = false;
  }

  public updateLeaseTerm(term: LeaseTerm): void {
    this.leaseTerm = term;
  }

  public getLeaseTerm(): string | undefined {
    return this.leaseTerm.getValue() ?? undefined;
  }

  public updateMonthRent(rent: MonthlyRent): void {
    this.monthlyRent = rent;
  }

  public getMonthlyRent(): string | undefined {
    return this.monthlyRent.getValue() ?? undefined;
  }

  public getLeaseId(): string {
    return this.leaseId;
  }

  public updateLeaseStartDate(date: LeaseStartDate): void {
    this.leaseStartData = date;
  }

  public getLeaseStartDate(): string | undefined {
    return this.leaseStartData.getValue() ?? undefined;
  }

  public updateLeaseEndDate(date: LeaseEndDate): void {
    this.leaseEndData = date;
  }

  public getLeaseEndDate(): string | undefined {
    return this.leaseEndData.getValue() ?? undefined;
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

  public updateHouseRule(rule: string) {
    this.houseRule = rule;
  }

  public getHouseRule(): string {
    return this.houseRule;
  }

  public updateIncludeUtilities(util: string) {
    this.includeUtilities = util;
  }

  public getIncludeUtilities(): string | undefined {
    return this.includeUtilities;
  }

  public getLandlord(): string {
    return this.landlordId;
  }

  public getStudent(): string {
    return this.studentId;
  }

  public getApartment(): string {
    return this.apartmentId;
  }
}
