import { LandlordAggregateRoot } from "../Aggregates/landloardAggregateRoot.entity";
import { UserResponseDTO } from "./ReadStudentRepositories.repositories";

export interface LandlordResponseDTO {
  user: UserResponseDTO;
  cliQAccount: string;
  landlordGovId: string;
  document: string;
  verifiedLandlord: boolean;
}
export interface IReadLandlordRepositories {
  findLandlordById(userId: string): Promise<LandlordAggregateRoot | null>;
  findAllLandlord(): Promise<LandlordResponseDTO[] | null>;
  searchByQuery(prefix: string): Promise<LandlordResponseDTO[] | null>;
}
