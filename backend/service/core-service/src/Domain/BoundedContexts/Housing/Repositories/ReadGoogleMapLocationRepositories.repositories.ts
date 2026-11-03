import { GoogleMapLocationEntity } from "../Entities/googleMapLocationEntity.entity";

export interface IReadGoogleMapLocationRepo {
  findGoogleMapLocationById(
    id: number
  ): Promise<GoogleMapLocationEntity | null>;

//   findGoogleMapLocationAsRange(
//     longitudeStartRange: number,
//     latitudeStartRange: number,
//     longitudeEndRange: number,
//     latitudeEndRange: number
//   ): Promise<GoogleMapLocationEntity[] | null>;
}
