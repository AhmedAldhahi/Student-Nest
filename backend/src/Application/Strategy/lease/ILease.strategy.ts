export interface ILeaseStrategy {
  FindAllLeases(userId: string): Promise<any>;
  SearchForLeases(query: string, userId: string): Promise<any>;
}
