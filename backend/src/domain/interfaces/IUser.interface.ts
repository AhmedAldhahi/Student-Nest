import { UserRole } from "../enum/UserRole.enum";
export interface IUser {
  getUserId(): number;
  getUserEmail(): string;
  getName(): string;
  getUserRole(): UserRole;
  getDateOfBirth(): Date;
  getIsActive(): boolean;
  getPhoneNumer(): string;
}

export interface IStudent {
  getStudentMajor(): string;
  getGraduateYear(): string;
  getUnversityName(): string;
  getstudentCardId(): string;
  getWalletAddress(): string | undefined;
  getStudent_Gov_Id(): string;
}

export interface ILandloard {
  cliQAccont: string;
  verfied: boolean;
  landloard_Gov_Id: string;
}
