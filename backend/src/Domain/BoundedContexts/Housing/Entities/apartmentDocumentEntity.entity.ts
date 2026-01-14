import { ApartmentDocumentType } from "../Enum/ApartmentDocument.enum";

export interface ApartmentDocumentData {
  apartmentDocumentId: string;
  apartmentType: ApartmentDocumentType; // enum
  documentUrl: string;
  apartmentsId: string;
}

export class ApartmentDocumentEntity {
  private apartmentDocumentId: string;
  private documentUrl: string;
  private apartmentType: ApartmentDocumentType;
  private apartmentsId: string;

  constructor(data: ApartmentDocumentData) {
    this.apartmentDocumentId = data.apartmentDocumentId;
    this.documentUrl = data.documentUrl;
    this.apartmentType = data.apartmentType;
    this.apartmentsId = data.apartmentsId;
  }

  public getApartmentDocumentId(): string {
    return this.apartmentDocumentId;
  }

  public getApartmentsId(): string {
    return this.apartmentsId;
  }

  public UpdateApartmentType(type: ApartmentDocumentType): void {
    this.apartmentType = type;
  }

  public getApartmentType(): ApartmentDocumentType {
    return this.apartmentType;
  }

  public markAsVerifiedFile(): void {
    this.apartmentType = ApartmentDocumentType.ApartmentVerifiedFile;
  }

  public markAsLeaseFile(): void {
    this.apartmentType = ApartmentDocumentType.LeaseFile;
  }

  public UpdateDocumentUrl(url: string): void {
    this.documentUrl = url;
  }

  public getDocumentUrl(): string {
    return this.documentUrl;
  }
}
