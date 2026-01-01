import { UserRole } from "../../../Domain/Shared/Enum/UserRole.enum";

export interface RegisterLandloardRequest {
  // require
  email: string;
  name: string;
  password: string;
  role: UserRole.landlord;
  dateOfBirth: string;
  phoneNumber: string;

  cliQAccount: string;
  LandlordGovId: string;
  document: Express.Multer.File;

  address?: string;
}
