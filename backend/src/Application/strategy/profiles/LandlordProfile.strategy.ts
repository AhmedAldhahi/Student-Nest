import { ILandlordRepository } from "../../../Core/repositories/LandlordRepositories.repositories";
import { IProfileStrategy } from "./IprofileStrategy.strategy";

export class LandlordProfileStrategy implements IProfileStrategy {
  constructor(private landlordRep: ILandlordRepository) {}

  public async UserProfile(userId: string): Promise<any> {
    const user = await this.landlordRep.findLandlordById(userId);

    if (!user) throw new Error("no user found !!");

    return {
      email: user.getUser().getEmail(),
      name: user.getUser().getName(),
      role: user.getUser().getRole(),
      dateOfBirth: user.getUser().getDateOfBirth(),
      phoneNumber: user.getUser().getPhoneNumber(),

      // optional
      address: user.getUser().getAddress(),
      photo: user.getUser().getPhoto(),
      LandlordGovId: user.getGovId(),
      cliQAccount: user.getCliQAccount(),
    };
  }
}
