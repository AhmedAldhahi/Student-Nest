import { LandlordAggregateRoot } from "../../AggregatesRoot/landloardEntity.entity";

export interface IReadLandlordRepositories { 
  findLandlordById(userId: string): Promise<LandlordAggregateRoot | null>;
}
