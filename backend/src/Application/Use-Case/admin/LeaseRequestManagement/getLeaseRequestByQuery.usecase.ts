import { IReadUserRepositories } from "../../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { LeaseRequestContext } from "../../../Strategy/leaseRequest/LeaseRequestContext";

export class GetLeaseRequestByQueryUseCase {
  constructor(
    private readonly context: LeaseRequestContext,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async execute(query: string, userId: string) {
    try {
      const user = await this.readUserRepo.findById(userId);
      if (!user) throw new Error("no user been found !!");

      return await this.context.executeSearchLeaseRequest(
        userId,
        user.getRole(),
        query
      );
    } catch (error: any) {
      console.error("fail to get lease request !!");
      throw error;
    }
  }
}
