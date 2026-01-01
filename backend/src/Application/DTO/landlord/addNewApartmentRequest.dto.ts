export interface ApartmentDataRequest {
  apartmentId: number;
  propertyStatus: boolean;
  title: string;
  description: string;
  price: string;
  address: string;
  numberOfRoom: string;
  numberOfBed: string;
  isJoin: boolean;
  createAt: Date;
  updateAt: Date;
  landlord: string; // replace with id

  apartmentDocument: Express.Multer.File[];
  apartmentPhoto: Express.Multer.File[];
  googleMapLocationLong: number;
  googleMapLocationLat: number;
}
