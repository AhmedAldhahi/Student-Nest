import { LandlordAggregateRoot } from "../../AggregatesRoot/landloardEntity.entity";

export interface IWriteLandlordRepositories { 
  addNewLandlord (landlord: LandlordAggregateRoot ) : Promise<void>;
  updateLandlord (landlord: LandlordAggregateRoot ): Promise<void>;
}


