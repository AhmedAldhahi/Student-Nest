import { LandlordResponseDTO } from "../../../../../Application/DTO/shared/profile/LandlordResponeDTO";
import { LandlordAggregateRoot } from "../../AgregateRoot/landloardEntity.entity";

export interface IReadLandlordRepositories {
  findLandlordById(userId: string): Promise<LandlordAggregateRoot | null>;
  findAllLandlord(): Promise<LandlordResponseDTO[] | null>;
  searchByQuery(prefix: string): Promise<LandlordResponseDTO[] | null>;
}
