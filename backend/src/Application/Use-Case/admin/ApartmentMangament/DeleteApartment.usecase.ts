import { IReadUserRepositories } from "../../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { ApartmentContext } from "../../../Strategy/apartment/ApartmentContext";

export class DeleteApartmentByIdUseCase {
  constructor(
    private readonly apartmentContext: ApartmentContext,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async execute(userId: string, id: number) {
    try {
      const user = await this.readUserRepo.findById(userId);

      if (!user) throw new Error("no user been found !!");

      await this.apartmentContext.DeleteApartment(id, user.getRole());

      return {
        message: "apartment deleted successfully ",
      };
    } catch (error: any) {
      console.error("fail tod delete apartment!!");
      throw error;
    }
  }
}
