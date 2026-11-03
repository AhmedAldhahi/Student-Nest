import { IReadLandlordRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadLandlordRepositories.repositoreies";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetLandlordProfileResponse } from "../Dto/Response/GetLandlordProfileResponse";
import { GetUserProfileQueries } from "../Queries/GetUserProfileQueries";

export class GetLandlordProfileQueriesHandlers
  implements IQueriesHandlers<GetUserProfileQueries>
{
  constructor(
    private readonly readLandlord: IReadLandlordRepositories,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async handle(
    command: GetUserProfileQueries
  ): Promise<GetLandlordProfileResponse> {
    try {
      const landlord = await this.readLandlord.findLandlordById(command.userId);
      if (!landlord) throw new Error("no landlord found !!");

      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

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
        LandlordGovId: landlord.getGovId(),
        cliQAccount: landlord.getCliQAccount(),
        document: landlord.getVerificationFile(),
        verifiedLandlord: landlord.getLandlordVerified(),
      };
    } catch (error: any) {
      console.error("failed to fetch landlord from  our app");
      throw error;
    }
  }
}
