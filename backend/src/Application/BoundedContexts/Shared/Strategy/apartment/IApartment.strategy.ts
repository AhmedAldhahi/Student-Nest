export interface IApartmentStrategy {
  deleteApartments(userId: string,id:string): Promise<any>;
  getApartmentByQueries(Queries: string, userId: string): Promise<any>;
  getAllApartment(userId: string): Promise<any>;
  FindApartmentDocumentById(userId: string, id: string): Promise<any>;
  GetApartmentDetailById( id: string, userId?: string,): Promise<any>;
}
