import { LandlordAggregateRoot } from "../Aggregates/landloardAggregateRoot.entity";

export interface IWriteLandlordRepositories { 
  addNewLandlord (landlord: LandlordAggregateRoot ) : Promise<void>;
  updateLandlord (landlord: LandlordAggregateRoot ): Promise<void>;
}


