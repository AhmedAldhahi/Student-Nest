import { UserRole } from "../../../../../Domain/Shared/Enum/UserRole.enum";

export interface GetUserProfileResponse {
  user: {
    userId: string;
    email: string | undefined;
    name: string | undefined;
    role: UserRole;
    dateOfBirth: string | undefined;
    phoneNumber: string | undefined;
    address: string | undefined;
    photo: string | null;
    createdAt: Date;
  };
}
