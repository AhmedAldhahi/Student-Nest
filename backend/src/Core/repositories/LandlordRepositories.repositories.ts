import { LandlordEntity } from "../entites/landloardEntity.entity";
import { GovernmentID } from "../value-object/UserGovId.vo";
import { VerificationDocument } from "../value-object/VerficationDocument.vo";
import { UserResponseDTO } from "./UserRepositories.repositories";

export interface LandlordResponseDTO {
  user: UserResponseDTO;
  cliQAccount: string;
  landlordGovId: string;
  document: string;
  verifiedLandlord: boolean;
}

export interface ILandlordRepository {
  createNewLandlord(user: LandlordEntity): Promise<void>;

  updateLandlord(user: LandlordEntity): Promise<void>;

  findLandlordById(userId: string): Promise<LandlordEntity | null>;

  findAllLandlord(): Promise<LandlordResponseDTO[] | null>;
}
