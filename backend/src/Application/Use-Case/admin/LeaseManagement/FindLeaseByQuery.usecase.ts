import { IReadUserRepositories } from "../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { LeaseContext } from "../../../Strategy/lease/LeaseContext";

export class FindLeasesByIdUseCase {
  constructor(
    private readonly context: LeaseContext,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async execute(query: string, userId: string) {
    try {
      const user = await this.readUserRepo.findById(userId);

      if (!user) throw new Error("no user been found !!");

      return await this.context.executeFindByQuery(
        query,
        userId,
        user.getRole()
      );
    } catch (error: any) {
      console.error("fail to get lease by id");
      throw error;
    }
  }
}
