import { LandlordResponseDTO } from "../../Application/Dtos/profile/LandlordResponeDTO";
import { LandlordAggregateRoot } from "../AggregatesRoot/landloardEntity.entity";

export interface ILandlordRepository {
  createNewLandlord(user: LandlordAggregateRoot): Promise<void>;

  updateLandlord(user: LandlordAggregateRoot): Promise<void>;

  findLandlordById(userId: string): Promise<LandlordAggregateRoot | null>;

  findAllLandlord(): Promise<LandlordResponseDTO[] | null>;
}
