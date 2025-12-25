import { LandlordResponseDTO } from "../../../Application/Dtos/profile/LandlordResponeDTO";
import { LandlordAggregateRoot } from "../../AggregatesRoot/landloardEntity.entity";

export interface IReadLandlordRepositories {
  findLandlordById(userId: string): Promise<LandlordAggregateRoot | null>;
  findAllLandlord(): Promise<LandlordResponseDTO[] | null>;
  searchByQuery(prefix: string): Promise<LandlordResponseDTO[] | null>;
}
