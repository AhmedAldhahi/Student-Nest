import { LandlordAggregateRoot } from "../../AgregateRoot/landloardEntity.entity";

export interface IWriteLandlordRepositories { 
  addNewLandlord (landlord: LandlordAggregateRoot ) : Promise<void>;
  updateLandlord (landlord: LandlordAggregateRoot ): Promise<void>;
}


