import { UserRole } from "../../../Domain/Shared/Enum/UserRole.enum";

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
