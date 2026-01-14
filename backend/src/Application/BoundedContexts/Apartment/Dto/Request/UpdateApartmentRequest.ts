export interface UpdateApartmentDataRequest {
  title?: string;
  description?: string;
  address?: string;
  numberOfBed?: string;
  numberOfRoom?: string;
  isJoin?: boolean;
  price?: string;
  photos?: Express.Multer.File[];
  }