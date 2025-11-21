import { LandlordEntity } from "../entites/landloardEntity.entity";

export interface ILandlordRepository { 
  createNewLandlord(user: LandlordEntity): Promise<void>;

  updateLandlord(user: LandlordEntity): Promise<void>;
}
