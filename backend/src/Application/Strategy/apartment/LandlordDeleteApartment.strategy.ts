import { IApartmentStrategy } from "./IApartment.strategy";

export class LandlordDeleteApartmentStrategy implements IApartmentStrategy {
  constructor() {}

  public async deleteApartments(userId: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
