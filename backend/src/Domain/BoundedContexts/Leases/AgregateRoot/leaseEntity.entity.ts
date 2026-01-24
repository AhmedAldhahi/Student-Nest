import { PaymentStatus } from "../../Payment/Enum/PaymentStatus.enum";
import { MonthlyRent } from "../../Housing/Value-Object/MonthlyRent.vo";
import { PaymentAggregateRoot } from "../../Payment/AgregateRoot/Payment.AgregateRoot";
import { PaymentAmount } from "../../Payment/Value-Object/PaymentAmount.vo";
import { LeaseDataType } from "../types/LeaseData";
import { LeaseEndDate } from "../Value-Object/LeaseEndDate.vo";
import { LeaseStartDate } from "../Value-Object/LeaseStartDate.vo";
import { LeaseTerm } from "../Value-Object/LeaseTerm.vo";
import { v4 as uuidv4 } from "uuid";

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
  private activateStatus: boolean = false;
  private paymentSchedule: PaymentAggregateRoot[] | null;

  constructor(data: LeaseDataType) {
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
    this.paymentSchedule = data.paymentSchedule;
  }

  /**
   * ==================================================================================
   *                              Behavior Methods
   * ==================================================================================
   */

  public generatePaymentSchedule(): void {
    const schedules: PaymentAggregateRoot[] = [];

    const currentDueDate = new Date(
      this.leaseStartData.getYear(),
      this.leaseStartData.getMonth() - 1,
      this.leaseStartData.getDays(),
    );

    const endDate = new Date(
      this.leaseEndData.getYear(),
      this.leaseEndData.getMonth() - 1,
      this.leaseEndData.getDays(),
    );

    const rentValue = this.monthlyRent.getValue();
    if (!rentValue) throw new Error("Monthly rent is missing");

    while (currentDueDate < endDate) {
      const newPayment = PaymentAggregateRoot.create({
        paymentId: uuidv4(),
        paymentStatus: PaymentStatus.UnPaid,
        amount: PaymentAmount.create(rentValue),
        dueDate: currentDueDate.toISOString().split("T")[0],
        leaseId: this.leaseId,
        paymentReceipt: null,
      });

      schedules.push(newPayment);

      currentDueDate.setMonth(currentDueDate.getMonth() + 1);
    }

    this.paymentSchedule = schedules;
  }

  public checkIfLeaseExpiredLease(): boolean {
    const endLease = this.leaseEndData;

    // convert to date
    const endDy = endLease.getDays();
    const endMonth = endLease.getMonth() - 1;
    const endYear = endLease.getYear();

    const expirationDate = new Date(endYear, endMonth, endDy);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return today > expirationDate;
  }

  /**
   * ==================================================================================
   *                              Update Methods sections
   * ==================================================================================
   */

  public ActivateStatus(): void {
    this.activateStatus = true;
  }

  public DeactivateStatus(): void {
    this.activateStatus = false;
  }

  public updateLeaseTerm(term: LeaseTerm): void {
    this.leaseTerm = term;
  }

  public updateMonthRent(rent: MonthlyRent): void {
    this.monthlyRent = rent;
  }

  public updateLeaseStartDate(date: LeaseStartDate): void {
    this.leaseStartData = date;
  }

  public updateLeaseEndDate(date: LeaseEndDate): void {
    this.leaseEndData = date;
  }

  public markAsActivated(): void {
    this.activateStatus = true;
  }

  public resetActivated(): void {
    this.activateStatus = false;
  }

  public markLandlordAsSigned(): void {
    this.isLandlordSigned = true;
  }

  public resetLandlordSigned(): void {
    this.isLandlordSigned = false;
  }

  public markStudentLandlordSigned(): void {
    this.isStudentSigned = true;
  }

  public resetStudentSigned(): void {
    this.isStudentSigned = false;
  }

  public updateHouseRule(rule: string): void {
    this.houseRule = rule;
  }

  public updateIncludeUtilities(util: string): void {
    this.includeUtilities = util;
  }

  /**
   * ==================================================================================
   *                              Getter Methods
   * ==================================================================================
   */

  public getCreateAt(): Date {
    return this.createAt;
  }

  public getStatus(): boolean {
    return this.activateStatus;
  }

  public getLeaseTerm(): string | undefined {
    return this.leaseTerm.getValue() ?? undefined;
  }

  public getMonthlyRent(): string | undefined {
    return this.monthlyRent.getValue() ?? undefined;
  }

  public getLeaseId(): string {
    return this.leaseId;
  }

  public getLeaseEndDate(): string | undefined {
    return this.leaseEndData.getValue() ?? undefined;
  }

  public getIsLandlordSigned(): boolean {
    return this.isLandlordSigned;
  }

  public getHouseRule(): string {
    return this.houseRule;
  }

  public getLeaseStartDate(): string | undefined {
    return this.leaseStartData.getValue() ?? undefined;
  }

  public getActivated(): boolean {
    return this.activateStatus;
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

  public getIsStudentSigned(): boolean {
    return this.isStudentSigned;
  }

  public getPaymentSchedule() {
    return this.paymentSchedule;
  }
}
