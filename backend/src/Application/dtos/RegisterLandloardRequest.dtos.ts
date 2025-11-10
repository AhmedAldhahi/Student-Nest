import { UserRole } from "../../Core/enum/UserRole.enum";

export interface RegisterLandloardRequest {
  // require
  email: string;
  name: string;
  password: string;
  role: UserRole.landloard;
  dateOfBirth: number;
  phoneNumber: string;

  cliQAccount: string;
  LandloardGovId: string;

  address?: string;
}
