import { LandlordAggregateRoot } from "../Aggregates/landloardAggregateRoot.entity";
import { LandlordResponseDTO } from "../Representations/LandlordResponseDTO";


export interface IReadLandlordRepositories {
  findLandlordById(userId: string): Promise<LandlordAggregateRoot | null>;
  findAllLandlord(): Promise<LandlordResponseDTO[] | null>;
  searchByQuery(prefix: string): Promise<LandlordResponseDTO[] | null>;
}
