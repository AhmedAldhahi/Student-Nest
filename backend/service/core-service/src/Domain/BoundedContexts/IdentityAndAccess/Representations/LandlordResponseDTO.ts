import { UserResponseDTO } from "./UserResponseDTO";

export interface LandlordResponseDTO {
  user: UserResponseDTO;
  cliQAccount: string;
  landlordGovId: string;
  document: string;
  verifiedLandlord: boolean;
}