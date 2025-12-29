
export interface IPhotoDocumentData {
  photoId: number;
  photoUrl: string;
}

export class ApartmentPhotoDocumentEntity {
  private photoId: number;
  private photoUrl: string;

  constructor(data: IPhotoDocumentData) {
    this.photoId = data.photoId;
    this.photoUrl = data.photoUrl;
  }

  public setPhotoId(id: number): void {
    this.photoId = id;
  }

  public getPhotoId(): number {
    return this.photoId;
  }

  public updatePhotoUrl(file: string): void {
    this.photoUrl = file;
  }

  public getPhotoUrl(): string {
    return this.photoUrl;
  }
}
