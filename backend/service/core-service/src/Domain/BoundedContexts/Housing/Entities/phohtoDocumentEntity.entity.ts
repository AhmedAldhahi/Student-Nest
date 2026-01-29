import { IPhotoDocumentData } from "../Types/PhotoDocumentType.type";

export class ApartmentPhotoDocumentEntity {
  private photoId: string;
  private photoUrl: string;

  constructor(data: IPhotoDocumentData) {
    this.photoId = data.photoId;
    this.photoUrl = data.photoUrl;
  }

  public getPhotoId(): string {
    return this.photoId;
  }

  public updatePhotoUrl(file: string): void {
    this.photoUrl = file;
  }

  public getPhotoUrl(): string {
    return this.photoUrl;
  }
}
