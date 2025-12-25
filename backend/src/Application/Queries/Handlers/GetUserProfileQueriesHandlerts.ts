import { IReadLandlordRepositories } from "../../../Domain/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { IReadUserRepositories } from "../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { UserResponseDTO } from "../../DTO/profile/ UserResponseDTO";
import { IQueriesHandlers } from "../IQueriesHandlers";
import { GetUserProfileQueries } from "../Queries/GetUserProfileQueries";

export class GetUserProfileQueriesHandlers
  implements IQueriesHandlers<GetUserProfileQueries>
{
  constructor(private readUserRepo: IReadUserRepositories) {}

  public async handle(command: GetUserProfileQueries) {
    try {
      const user = await this.readUserRepo.findById(command.userId);

      if (!user) throw new Error("no user found !!");

      return {
        user: {
          userId: user.getUserId(),
          email: user.getEmail(),
          name: user.getName(),
          role: user.getRole(),
          dateOfBirth: user.getDateOfBirth(),
          phoneNumber: user.getPhoneNumber(),

          address: user.getAddress(),
          photo: user.getPhoto() || null,
          createdAt: user.getCreatedAt(),
        },
      };
    } catch (error: any) {
      console.error("failed to fetch user from  our app");
      throw error;
    }
  }
}
