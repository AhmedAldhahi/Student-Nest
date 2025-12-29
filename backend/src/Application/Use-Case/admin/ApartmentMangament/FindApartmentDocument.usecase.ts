import { IReadUserRepositories } from "../../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { GetDocumentOfApartmentByIdQueries } from "../../../Queries/Queries/GetDocumentOfApartmntByIdQueries";
import { ApartmentContext } from "../../../Strategy/apartment/ApartmentContext";

export class findApartmentDocumentByIdUseCase {
  constructor(
    private readonly apartmentContext: ApartmentContext,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async execute(id: number, userId: string) {
    try {
      const user = await this.readUserRepo.findById(userId);
      if (!user) throw new Error("no user been found!!");

      return await this.apartmentContext.executeApartmentDocumentById(
        userId,
        user.getRole(),
        id
      );
    } catch (error: any) {
      console.error("fail to get all apartment document !!");
      throw error;
    }
  }
}
