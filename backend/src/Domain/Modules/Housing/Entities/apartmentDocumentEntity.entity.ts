import { ApartmentDocumentType } from "../../../Shared/Enum/ApartmentDocument.enum";

export interface ApartmentDocumentData {
  apartmentId: string;
  apartmentType: ApartmentDocumentType; // enum
  documentUrl: string;
}

export class ApartmentDocumentEntity {
  private apartmentId: string;
  private documentUrl: string;
  private apartmentType: ApartmentDocumentType;

  constructor(data: ApartmentDocumentData) {
    this.apartmentId = data.apartmentId;
    this.documentUrl = data.documentUrl;
    this.apartmentType = data.apartmentType;
  }

  public getApartmentId(): string {
    return this.apartmentId;
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
