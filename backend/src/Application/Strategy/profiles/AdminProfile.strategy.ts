
import { IReadUserRepositories } from "../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { IUserRepository } from "../../../Domain/Repositories/UserRepositories.repositories";
import { UserDateOfBirth } from "../../../Domain/Value-Object/UserDateOfBirth.vo";
import { UserName } from "../../../Domain/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../Domain/Value-Object/UserPhoneNumber.vo";
import { userUpdateProfileRequest } from "../../Dtos/profile/adminRequest.updateProfile.profile.dtos";
import { ICashMemoryService } from "../../Interfaces/ICash.interface";
import { IFileStorageService } from "../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../Interfaces/IPassword.interface";
import { GetUserProfileQueriesHandlers } from "../../Querie/Handlers/GetUserProfileQueriesHandlerts";
import { GetUserProfileQueries } from "../../Querie/Queries/GetUserProfileQueries";
import { IProfileStrategy } from "./IprofileStrategy.strategy";

export class AdminProfileStrategy implements IProfileStrategy {
  constructor(
    private readonly QueryHandler: GetUserProfileQueriesHandlers,
    //private readonly passworderService: IPasswordService,
   // private readonly fileService: IFileStorageService,
    private readonly cashService: ICashMemoryService
  ) {}
  public async UserProfile(userId: string) {
    const cashKey = `profile : ${userId}`;

    const cashData = await this.cashService.get<any>(cashKey);

    if (cashData) {
      return cashData;
    }

    //const user = await this.userRep.findById(userId);

    const Queries = new GetUserProfileQueries(userId);
    const user = await this.QueryHandler.handle(Queries);

    if (!user) throw new Error("no user");


    await this.cashService.set(cashKey, user, 36000);

    return user;
  }

  // public async UpdateUserProfile(
  //   userId: string,
  //   dto: userUpdateProfileRequest
  // ): Promise<any> {
  //   try {
  //     const user = await this.userRep.findById(userId);
  //     if (!user) throw new Error("no user found !!");

  //     const cashKey = `profile : ${userId}`;
  //     await this.cashService.delete(cashKey);

  //     // Update fields
  //     if (dto.address) user.setAddress(dto.address);

  //     if (dto.dateOfBirth)
  //       user.updateDateOfBirth(new UserDateOfBirth(dto.dateOfBirth));

  //     if (dto.name) user.updateName(new UserName(dto.name));

  //     if (dto.phoneNumber)
  //       user.updatePhoneNumber(new userPhoneNumber(dto.phoneNumber));

  //     if (dto.photo) {
  //       const photo = user.getPhoto();
  //       if (photo) {
  //         let photoDoc: string = await this.fileService.update(
  //           dto.photo,
  //           photo
  //         );
  //         user.setPhoto(photoDoc);
  //       }
  //       let photoDoc: string = await this.fileService.upload(dto.photo);
  //       user.setPhoto(photoDoc);
  //     }

  //     if (dto.newPassword && dto.oldPassword) {
  //       const validatePass = await this.passworderService.compare(
  //         dto.oldPassword,
  //         user.getPass()
  //       );

  //       if (!validatePass) throw new Error("old pass is not correct");
  //       const newPass = await this.passworderService.hash(dto.newPassword);

  //       if (await this.passworderService.compare(newPass, user.getPass()))
  //         throw new Error("you use this password before");

  //       user.setPassword(newPass);
  //     }

  //     // Save the updated user
  //     await this.userRep.updateUser(user);

  //     // Return success message
  //     return {
  //       message: "Admin profile updated successfully",
  //     };
  //   } catch (error: any) {
  //     console.error("Error updating profile:", error.message);
  //     throw error; // Optionally re-throw the error if you need it to propagate
  //   }
  // }
}
