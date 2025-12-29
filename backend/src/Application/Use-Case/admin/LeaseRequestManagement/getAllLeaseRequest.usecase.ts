import { IReadUserRepositories } from "../../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { GetAllLeaseRequestQueriesHandler } from "../../../Queries/Handlers/GetAllLeaseRequestQueriesHandler";
import { LeaseRequestContext } from "../../../Strategy/leaseRequest/LeaseRequestContext";

export class GetAllLeaseRequestUseCase {
  constructor(
    private readonly context: LeaseRequestContext,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async execute(userId: string) {
    try {
      const user = await this.readUserRepo.findById(userId);
      if (!user) throw new Error("no user been found !!");

      return await this.context.executeGetAllLeaseRequest(
        userId,
        user.getRole()
      );
      
    } catch (error: any) {
      console.error("fail to fetch request leases !!");
      throw error;
    }
  }
}
