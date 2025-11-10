import { Landloard } from "../entites/landloard.entity";

export interface ILandloardRepository {
  findByEmail(email: string): Promise<Landloard | null>; // in db
  save(user: Landloard): Promise<void>; // in db
  findById(id: string): Promise<Landloard | null>; // in db 
}
