import { IApartmentStrategy } from "./IApartment.strategy";

export class LandlordApartmentStrategy implements IApartmentStrategy {
  constructor() {}
  
  public async FindApartmentDocumentById(userId: string, id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  
  public async getAllApartment(userId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  
  public async getApartmentByQueries(Queries: string, userId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  public async deleteApartments(userId: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
