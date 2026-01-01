export interface IApartmentStrategy {
  deleteApartments(userId: string): Promise<any>;
  getApartmentByQueries(Queries: string, userId: string): Promise<any>;
  getAllApartment(userId: string): Promise<any>;
  FindApartmentDocumentById(userId: string, id: string): Promise<any>;
  GetApartmentDetailById(userId: string, id: string): Promise<any>;
}
