import { ApartmentDocumentType } from "../Enum/ApartmentDocument.enum";

export interface ApartmentDocumentData {
  apartmentId: number;
  apartmentType: ApartmentDocumentType; // enum
  documentUrl: string;
}

//TODO: need to add mediator design pattern 

export class ApartmentDocumentEntity { 

  private apartmentId: number;
  private documentUrl: string;
  private apartmentType: ApartmentDocumentType;

  constructor(data: ApartmentDocumentData) {
    this.apartmentId = data.apartmentId;
    this.documentUrl = data.documentUrl;
    this.apartmentType = data.apartmentType;
  }

  public setApartmentId(id: number): void {
    this.apartmentId = id;
  }

  public getApartmentId(): number {
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
