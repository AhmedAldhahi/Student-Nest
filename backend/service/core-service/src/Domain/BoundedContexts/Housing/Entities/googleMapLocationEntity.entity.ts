import { GoogleMapLocationData } from "../Types/GoogleMapLocationData.type";

export class GoogleMapLocationEntity {
  private googleMapLocationId: string;
  private longitude: string;
  private latitude: string;

  constructor(data: GoogleMapLocationData) {
    if (data.placeId) this.googleMapLocationId = data.placeId;
    this.longitude = data.longitude;
    this.latitude = data.latitude;
  }

  public getGoogleMapLocationId(): string {
    return this.googleMapLocationId;
  }

  public updateLongitude(longitude: string): void {
    this.validateLongitude(longitude);
    this.longitude = longitude;
  }

  public getLongitude(): string {
    return this.longitude;
  }

  public updateLatitude(latitude: string): void {
    this.validateLatitude(latitude);
    this.latitude = latitude;
  }

  public getLatitude(): string {
    return this.latitude;
  }

  private validateLatitude(lat: string): void {
    // 1. Check Format (At most 20 decimal places)
    // Regex: Optional minus, numbers, optional dot, 1 to 20 digits
    const regex = /^-?\d+(\.\d{1,20})?$/;

    if (!regex.test(lat)) {
      throw new Error(
        "Latitude invalid: Must be a number with at most 20 decimal places."
      );
    }

    // 2. Check Range (-90 to 90)
    const num = parseFloat(lat);
    if (isNaN(num) || num < -90 || num > 90) {
      throw new Error("Latitude invalid: Must be between -90 and 90.");
    }
  }

  private validateLongitude(long: string): void {
    // 1. Check Format (At most 20 decimal places)
    const regex = /^-?\d+(\.\d{1,20})?$/;

    if (!regex.test(long)) {
      throw new Error(
        "Longitude invalid: Must be a number with at most 20 decimal places."
      );
    }

    // 2. Check Range (-180 to 180)
    const num = parseFloat(long);
    if (isNaN(num) || num < -180 || num > 180) {
      throw new Error("Longitude invalid: Must be between -180 and 180.");
    }
  }
}
