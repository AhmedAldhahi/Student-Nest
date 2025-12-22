export interface GoogleMapLocationData {
  placeId: number;
  longitude: number;
  latitude: number;
}

export class GoogleMapLocationEntity {
  private googleMapLocationId: number;
  private longitude: number;
  private latitude: number;

  constructor(data: GoogleMapLocationData) {
    this.googleMapLocationId = data.placeId;
    this.longitude = data.longitude;
    this.latitude = data.latitude;
  }

  public setGoodMapLocationId(id: number): void {
    this.googleMapLocationId = id;
  }

  public getGoogleMapLocationId(): number {
    return this.googleMapLocationId;
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
