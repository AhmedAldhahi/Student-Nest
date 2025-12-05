import { UserRole } from "../../../Core/enum/UserRole.enum";

export interface RegisterLandloardRequest {
  // require
  email: string;
  name: string;
  password: string;
  role: UserRole.landloard;
  dateOfBirth: string;
  phoneNumber: string;

  cliQAccount: string;
  LandloardGovId: string;
  document: Express.Multer.File;

  address?: string;
}
