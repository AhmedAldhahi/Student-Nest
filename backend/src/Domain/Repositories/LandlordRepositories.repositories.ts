import { LandlordAggregateRoot } from "../AggregatesRoot/landloardEntity.entity";
import { UserResponseDTO } from "./UserRepositories.repositories";

export interface LandlordResponseDTO {
  user: UserResponseDTO;
  cliQAccount: string;
  landlordGovId: string;
  document: string;
  verifiedLandlord: boolean;
}

export interface ILandlordRepository {
  createNewLandlord(user: LandlordAggregateRoot): Promise<void>;

  updateLandlord(user: LandlordAggregateRoot): Promise<void>;

  findLandlordById(userId: string): Promise<LandlordAggregateRoot | null>;

  findAllLandlord(): Promise<LandlordResponseDTO[] | null>;
}
