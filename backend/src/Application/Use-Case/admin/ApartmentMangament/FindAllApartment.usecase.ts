import { IReadUserRepositories } from "../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { ApartmentContext } from "../../../Strategy/apartment/ApartmentContext";

export class findAllApartmentUseCase {
  constructor(
    private readonly apartmentContext: ApartmentContext,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async execute(userId: string) {
    try {
      const user = await this.readUserRepo.findById(userId);

      if (!user) throw new Error("no user been found !!");

      return await this.apartmentContext.executeGetAllApartments(
        userId,
        user.getRole()
      );
    } catch (error: any) {
      console.error("fail to get all apartments !!");
      throw error;
    }
  }
}
