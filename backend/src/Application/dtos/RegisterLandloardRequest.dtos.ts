import { UserRole } from "../../Core/enum/UserRole.enum";

export interface RegisterLandloardRequest {
  // require
  email: string;
  name: string;
  hashedPassword: string;
  role: UserRole.student;
  dateOfBirth: Date;
  phoneNumber: string;

  cliQAccount: string;
  LandloardGovId: string;

  address?: string;
}
