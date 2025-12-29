export interface IApartmentStrategy {
  deleteApartments(userId: number): Promise<any>;
  getApartmentByQueries(Queries: string, userId: string): Promise<any>;
  getAllApartment(userId: string): Promise<any>;
  FindApartmentDocumentById(userId: string, id: number): Promise<any>;
  GetApartmentDetailById(userId: string, id: number): Promise<any>;
}
