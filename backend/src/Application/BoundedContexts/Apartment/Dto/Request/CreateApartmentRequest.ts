export interface AddNewApartmentRequest {
  apartmentId: number;
  title: string;
  description: string;
  price: string;
  address: string;
  numberOfRoom: string;
  numberOfBed: string;
  isJoin: boolean;

  propertyStatus: boolean;
  Verified: boolean;

  createAt: Date;
  updateAt: Date;
  landlord: string;

  apartmentDocument: Express.Multer.File | null;
  apartmentPhoto: Express.Multer.File[];
  googleMapLocationLong: string;
  googleMapLocationLat: string;
}
