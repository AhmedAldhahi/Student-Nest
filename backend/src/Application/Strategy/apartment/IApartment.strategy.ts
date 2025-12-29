export interface IApartmentStrategy {
  deleteApartments(userId: number): Promise<any>;
}
