export interface UserResponseDTO {
  userId: string;
  name: string;
  dateOfBirth: string;
  email: string;
  role: string;
  phoneNumber: string;
  address?: string;
  photo?: string;
  createdAt: Date;
  emailVerified: boolean;
}