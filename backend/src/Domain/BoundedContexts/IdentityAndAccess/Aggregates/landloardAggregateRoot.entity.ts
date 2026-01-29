import { AggregateRoot } from "../../../Shared/AgregateRoot/AggregateRoot";
import { LeaseRequestStatus } from "../../Leases/Enum/LeaseRequestStatus.enum";
import { VerifiedLandlordStatus } from "../../Payment/Enum/VerfiedLandlordStatus.enum";
import { GovernmentID } from "../Value-Object/UserGovId.vo";
import { VerificationDocument } from "../Value-Object/VerficationDocument.vo";
import { LeaseRequestEntity } from "../../Leases/Entities/leaseRequestEntity.entity";
import { PaymentAggregateRoot } from "../../Payment/AgregateRoot/Payment.AgregateRoot";
import { ReceiptEntity } from "../../Payment/Entities/ReceiptEntities.entity";
import { ApartmentDocumentEntity } from "../../Housing/Entities/apartmentDocumentEntity.entity";
import { LandlordDataType } from "../types/ILandlordData.type";
import { ApartmentAggregateRoot } from "../../Housing/AgregateRoot/apartmentEntity.entity";
import { LeaseAggregateRoot } from "../../Leases/AgregateRoot/leaseEntity.entity";
import { LandlordRegisterEvent } from "../Events/LandlordRegisterdEvent.event";

export class LandlordAggregateRoot extends AggregateRoot<string> {
  private userId: string;
  private landlordGovId: GovernmentID;
  private cliQAccount: string;
  private isVerifiedLandlord: boolean = false;
  private document: VerificationDocument;

  constructor(data: LandlordDataType) {
    super(data.userId);
    this.userId = data.userId;
    this.cliQAccount = data.cliQAccount;
    this.landlordGovId = data.landlordGovId;
    this.document = data.document;
    this.isVerifiedLandlord = data.isVerifiedLandlord ?? false;
  }

  public static create(data: LandlordDataType) {
    const newData = { ...data, isVerifiedLandlord: false };

    const landlord = new LandlordAggregateRoot(newData);
    landlord.addDomainEvent(new LandlordRegisterEvent(landlord.getUserId()));

    return landlord;
  }

  /**
   * ==================================================================================
   *                              Behavior Methods sections
   * ==================================================================================
   */

  public updateLeaseRequestStatus(
    leaseRequest: LeaseRequestEntity,
    status: LeaseRequestStatus,
  ) {
    this.ensureIsLandlordVerified();

    if (status === LeaseRequestStatus.Accept) {
      leaseRequest.accept();
    }

    if (status === LeaseRequestStatus.Reject) {
      leaseRequest.reject();
    }
  }

  public updatePaymentScheduleStatus(
    paymentSchedule: PaymentAggregateRoot,
    lease: LeaseAggregateRoot,
    receipt: ReceiptEntity,
    status: VerifiedLandlordStatus,
  ): void {
    if (receipt.getVerifiedByLandlord() === VerifiedLandlordStatus.Accept) {
      throw new Error("Accepted payment cannot be modified.");
    }

    switch (status) {
      case VerifiedLandlordStatus.Accept:
        receipt.markAsVerified();
        paymentSchedule.acceptPayment();
        lease.markAsActivated();

        break;

      case VerifiedLandlordStatus.Reject:
        receipt.markAsNotVerified();

        paymentSchedule.rejectPayment();
        break;

      case VerifiedLandlordStatus.Pending:
        break;

      default:
        throw new Error("Invalid verification status provided.");
    }
  }

  /**
   * ==================================================================================
   *                              Update Methods sections
   * ==================================================================================
   */

  public updateVerificationFile(file: VerificationDocument): void {
    this.document = file;
    this.isVerifiedLandlord = false;
  }

  public ensureIsLandlordVerified(): void {
    if (this.isVerifiedLandlord === false) {
      throw new Error("you have to be verified to apply your functionality ");
    }
  }

  public markLandlordAsVerified(): void {
    this.isVerifiedLandlord = true;
  }

  public resetLandlordVerified(): void {
    this.isVerifiedLandlord = false;
  }

  public updateCliQAccount(cliQ: string): void {
    if (cliQ.length < 3) throw new Error("invalid CliQ Account !!");
    this.cliQAccount = cliQ;
  }

  /**
   * ==================================================================================
   *                              Getter Methods sections
   * ==================================================================================
   */

  public getCliQAccount(): string {
    return this.cliQAccount;
  }

  public getLandlordVerified(): boolean {
    return this.isVerifiedLandlord;
  }

  public getVerificationFile(): string | undefined {
    return this.document.getValue() ?? undefined;
  }

  public getGovId(): string | undefined {
    return this.landlordGovId.getValue() ?? undefined;
  }

  public getUserId(): string {
    return this.userId;
  }
}
