export interface ApartmentDataRequest {
  apartmentId: number;
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

  apartmentDocument: Express.Multer.File | null;
  apartmentPhoto: Express.Multer.File[];
  googleMapLocationLong: string;
  googleMapLocationLat: string;
}
