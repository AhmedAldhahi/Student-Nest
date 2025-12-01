import { IUserRepository } from "../../../Core/repositories/UserRepositories.repositories";
import { IProfileStrategy } from "./IprofileStrategy.strategy";

export class AdminProfileStrategy implements IProfileStrategy {
  constructor(private userRep: IUserRepository) {}
  public async UserProfile(userId: string): Promise<any> {
    const user = await this.userRep.findById(userId);
    if (!user) throw new Error("no user");

    return {
      email: user.getEmail(),
      name: user.getName(),
      role: user.getRole(),
      dateOfBirth: user.getDateOfBirth(),
      phoneNumber: user.getPhoneNumber(),

      // optional
      address: user.getAddress(),
      photo: user.getPhoto(),
    };
  }
}
