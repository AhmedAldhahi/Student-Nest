import { Landloard } from "../entites/landloard.entity";

export interface ILandloardRepository {
  findByEmail(email: string): Promise<Landloard | null>;
  save(user: Landloard): Promise<void>;
  findById(id: string): Promise<Landloard | null>;
}
