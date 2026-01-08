import { AggregateRoot } from "../../../Shared/AgregateRoot/AggregateRoot";
import { LeaseRequestStatus } from "../../../Shared/Enum/LeaseRequestStatus.enum";
import { PaymentStatus } from "../../../Shared/Enum/PaymentStatus.enum";
import { VerifiedLandlordStatus } from "../../../Shared/Enum/VerfiedLandlordStatus.enum";
import { GovernmentID } from "../../../Shared/Value-Object/UserGovId.vo";
import { VerificationDocument } from "../../../Shared/Value-Object/VerficationDocument.vo";
import { LeaseRequestEntity } from "../../Leases/Entities/leaseRequestEntity.entity";
import { PaymentAggregateRoot } from "../../Payment/AgregateRoot/Payment.AgregateRoot";
import { ReceiptEntity } from "../../Payment/Entities/ReceiptEntities.entity";
import { ApartmentDocumentEntity } from "../Entities/apartmentDocumentEntity.entity";
import { ILandlordData } from "../Types/ILandlordData.type";
import { ApartmentAggregateRoot } from "./apartmentEntity.entity";

export class LandlordAggregateRoot extends AggregateRoot<string> {
  private userId: string;
  private landlordGovId: GovernmentID;
  private cliQAccount: string;
  private isVerifiedLandlord: boolean;
  private document: VerificationDocument;

  constructor(data: ILandlordData) {
    super();
    this.userId = data.userId;
    this.cliQAccount = data.cliQAccount;
    this.landlordGovId = data.landlordGovId;
    this.document = data.document;
    this.isVerifiedLandlord = data.isVerifiedLandlord ?? false;
  }

  /**
   * ==================================================================================
   *                              Behavior Methods sections
   * ==================================================================================
   */

  public addNewApartment(apartmentInfo: ApartmentAggregateRoot) {
    this.ensureIsLandlordVerified();

    if (
      !apartmentInfo.getApartmentPhotoDocument() ||
      apartmentInfo.getApartmentPhotoDocument().length === 0
    ) {
      throw new Error("apartment photo is require !!");
    }

    if (apartmentInfo.getApartmentPhotoDocument().length > 6) {
      throw new Error("max size of photo is 6 ");
    }

    if (!apartmentInfo.getGoogleMapLocation()) {
      throw new Error("apartment google map location is require ");
    }
  }

  public AddApartmentDocumentFile(
    apartment: ApartmentAggregateRoot,
    apartmentDoc: ApartmentDocumentEntity
  ) {
    // make need validation
    if (!apartmentDoc) {
      console.log("no document to add ");
      return;
    }
    this.ensureIsLandlordVerified();

    apartment.AddApartmentDocument(apartmentDoc);
  }

  public UpdateApartmentDocumentFile(
    apartment: ApartmentAggregateRoot,
    apartmentDoc: ApartmentDocumentEntity
  ) {
    // make need validation
    if (!apartmentDoc) {
      console.log("no document to add ");
      return;
    }
    this.ensureIsLandlordVerified();

    apartment.updateApartmentDocument(apartmentDoc);
  }

  public updateLeaseRequestStatus(
    leaseRequest: LeaseRequestEntity,
    status: LeaseRequestStatus
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
    receipt: ReceiptEntity,
    status: VerifiedLandlordStatus
  ): void {
    // 1. Validation: Prevent changing a payment that is already "Paid/Accepted"

    // if (paymentSchedule.getPaymentStatus() === PaymentStatus.Paid) {
    //   throw new Error("Accepted payment cannot be modified.");
    // }

    switch (status) {
      case VerifiedLandlordStatus.Accept:
        receipt.markAsVerified();

        paymentSchedule.acceptPayment();
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
