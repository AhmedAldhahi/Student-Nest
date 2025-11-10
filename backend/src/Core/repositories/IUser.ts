import { UserRole } from "../enum/UserRole.enum";

export interface IUser {
  getUserId(): string;
  setUserId(userId: string): void;

  getDateOfBirth(): Date;
  setDateOfBirth(dob: Date): void;

  getPassword(): string;
  setPass(userPass: string): void;

  getEmail(): string;
  setEmail(email: string): void;

  setName(userName: string): void;
  getName(): string;

  getRole(): UserRole;
  setRole(role: UserRole): void;

  getPhoeNumber(): string;
  setPhoneNumber(phone: string): void;

  getAddress(): string | undefined;
  setAddress(userAddress: string): void;

  getPhoto(): string | undefined;
  setPhoto(photoUrl: string): void;

  ActiveteAccount(): void;
  DeactivateAccount(): void;
  bandedAccount(): void;
}
