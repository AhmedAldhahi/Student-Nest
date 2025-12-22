import { LandlordAggregateRoot } from "./landloardEntity.entity";
import { StudentAggregateRoot } from "./studentEntity.entity";
import { LeaseEndDate } from "../Value-Object/LeaseEndDate.vo";
import { LeaseStartDate } from "../Value-Object/LeaseStartDate.vo";
import { LeaseTerm } from "../Value-Object/LeaseTerm.vo";
import { MonthlyRent } from "../Value-Object/MonthlyRent.vo";
import { ApartmentEntity } from "./apartmentEntity.entity";

export interface ILeaseData {
  leaseId: number;
  houseRule: string;
  isLandlordSigned: boolean;
  isStudentSigned: boolean;
  ActivationStatus: boolean;
  includeUtilities?: string;
  leaseStartData: LeaseStartDate;
  leaseEndData: LeaseEndDate;
  monthlyRent: MonthlyRent;
  leaseTerm: LeaseTerm;

  student: StudentAggregateRoot;
  landlord: LandlordAggregateRoot;
  createAt: Date;

  // apartment fk need to add
  //apartment: ApartmentEntity;
}

export class LeaseAggregateRoot {
  private leaseId: number;
  private isLandlordSigned: boolean;
  private isStudentSigned: boolean;
  private houseRule: string;
  private includeUtilities?: string;
  private leaseStartData: LeaseStartDate;
  private leaseEndData: LeaseEndDate;
  private monthlyRent: MonthlyRent;
  private leaseTerm: LeaseTerm;

  private apartment: ApartmentEntity;
  private student: StudentAggregateRoot;
  private landlord: LandlordAggregateRoot;

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
    this.student = data.student;
    this.landlord = data.landlord;
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

  public getLeaseTerm(): string {
    return this.leaseTerm.getValue();
  }

  public updateMonthRent(rent: MonthlyRent): void {
    this.monthlyRent = rent;
  }

  public getMonthlyRent(): string | undefined {
    return this.monthlyRent.getValue() ?? undefined;
  }

  public setLeaseId(id: number): void {
    this.leaseId = id;
  }

  public getLeaseId(): number {
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

  public getLandlord(): LandlordAggregateRoot {
    return this.landlord;
  }

  public getStudent(): StudentAggregateRoot {
    return this.student;
  }
}
