import { UserRole } from "../../../Core/enum/UserRole.enum";

export interface AdminProfileResponse {
  email: string;
  name: string;
  password: string;
  role: UserRole;
  dateOfBirth: string;
  phoneNumber: string;

  // optional
  address?: string;
  photo?: string;
}
