import { IReadLandlordRepositories } from "../../../Domain/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { LandlordRepository } from "../../../Infrastructure/Repositories/landloard.repositories";
import { LandlordResponseDTO } from "../../Dtos/profile/LandlordResponeDTO";
import { IQueriesHandlers } from "../IQuerieHandlers";
import { GetUserProfileQueries } from "../Queries/GetUserProfileQueries";

export class GetLandlordProfileQueriesHandlers
  implements IQueriesHandlers<GetUserProfileQueries>
{
  constructor(private readonly readLandlord: IReadLandlordRepositories) {}

  public async handle(command: GetUserProfileQueries) {
    try {
      const user = await this.readLandlord.findLandlordById(command.userId);

      if (!user) throw new Error("no user found !!");

      return {
        user: {
          userId: user.getUser().getUserId(),
          email: user.getUser().getEmail(),
          name: user.getUser().getName(),
          role: user.getUser().getRole(),
          dateOfBirth: user.getUser().getDateOfBirth(),
          phoneNumber: user.getUser().getPhoneNumber(),

          address: user.getUser().getAddress(),
          photo: user.getUser().getPhoto() || null,
          createdAt: user.getUser().getCreatedAt(),
        },
        LandlordGovId: user.getGovId(),
        cliQAccount: user.getCliQAccount(),
        document: user.getVerificationFile(),
        verifiedLandlord: user.getLandlordVerified(),
      };
    } catch (error: any) {
      console.error("failed to fetch landlord from  our app");
      throw error;
    }
  }
}
