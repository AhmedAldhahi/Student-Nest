export interface GoogleMapLocationData {
  placeId: string;
  longitude: number;
  latitude: number;
}

export class GoogleMapLocationEntity {
  private googleMapLocationId: string;
  private longitude: number;
  private latitude: number;

  constructor(data: GoogleMapLocationData) {
    if (data.placeId) this.googleMapLocationId = data.placeId;
    this.longitude = data.longitude;
    this.latitude = data.latitude;
  }

  public getGoogleMapLocationId(): string  {
    return this.googleMapLocationId ?? undefined;
  }

  public updateLongitude(longitude: number): void {
    this.longitude = longitude;
  }

  public getLongitude(): number {
    return this.longitude;
  }

  public updateLatitude(latitude: number): void {
    this.latitude = latitude;
  }

  public getLatitude(): number {
    return this.latitude;
  }
}
