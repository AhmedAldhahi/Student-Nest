import { IReadUserRepositories } from "../../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { LeaseContext } from "../../../Strategy/lease/LeaseContext";

export class FindAllLeaseUseCase {
  constructor(
    private readonly context: LeaseContext,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async execute(userId: string) {
    try {
      const user = await this.readUserRepo.findById(userId);

      if (!user) throw new Error("no user been found !!");

      return await this.context.executeFindAllLease(userId, user.getRole());
    } catch (error: any) {
      console.error("fail to get leases !!", error);
      throw error;
    }
  }
}
