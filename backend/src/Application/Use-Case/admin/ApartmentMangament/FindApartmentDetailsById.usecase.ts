import { IReadUserRepositories } from "../../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { ApartmentContext } from "../../../Strategy/apartment/ApartmentContext";

export class findApartmentByIdUseCase {
  constructor(
    private readonly apartmentContext: ApartmentContext,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async execute(id: number, userId: string) {
    try {
      const user = await this.readUserRepo.findById(userId);
      if (!user) throw new Error("no user been found !!");

      return await this.apartmentContext.executeGetApartmentDetailById(
        userId,
        user.getRole(),
        id
      );
    } catch (error: any) {
      console.error(`fail to get apartment detail with this id : ${id}`);
      throw error;
    }
  }
}
