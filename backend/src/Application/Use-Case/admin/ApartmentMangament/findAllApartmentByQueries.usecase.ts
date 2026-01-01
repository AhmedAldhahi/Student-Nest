import { IReadUserRepositories } from "../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { ApartmentContext } from "../../../Strategy/apartment/ApartmentContext";

export class FindAllApartmentByQueryUseCase {
  constructor(
    private readonly context: ApartmentContext,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async execute(Query: string, userId: string) {
    try {
      const user = await this.readUserRepo.findById(userId);
      if (!user) throw new Error("no user been found !!");

      return await this.context.GetApartmentsBySearchByQueries(
        userId,
        user.getRole(),
        Query
      );
    } catch (error: any) {
      console.error("fail to get apartments");
      throw error;
    }
  }
}
