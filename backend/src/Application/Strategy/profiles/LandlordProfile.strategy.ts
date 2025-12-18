import { ILandlordRepository } from "../../../Domain/Repositories/LandlordRepositories.repositories";
import { IReadLandlordRepositories } from "../../../Domain/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { IReadUserRepositories } from "../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { UserDateOfBirth } from "../../../Domain/Value-Object/UserDateOfBirth.vo";
import { UserName } from "../../../Domain/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../Domain/Value-Object/UserPhoneNumber.vo";
import { LandlordUpdateProfileRequest } from "../../Dtos/profile/LandlordRequest.updateProfile.profile.dtos";
import { ICashMemoryService } from "../../Interfaces/ICash.interface";
import { IFileStorageService } from "../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../Interfaces/IPassword.interface";
import { GetLandlordProfileQueriesHandlers } from "../../Querie/Handlers/GetLandlordProfileQueriesHandler";
import { GetUserProfileQueriesHandlers } from "../../Querie/Handlers/GetUserProfileQueriesHandlerts";
import { GetUserProfileQueries } from "../../Querie/Queries/GetUserProfileQueries";
import { IProfileStrategy } from "./IprofileStrategy.strategy";

export class LandlordProfileStrategy implements IProfileStrategy {
  constructor(
    private readonly QueryHandler: GetLandlordProfileQueriesHandlers,
    // private readonly passwordService: IPasswordService,
    // private readonly fileService: IFileStorageService,
    private readonly cashService: ICashMemoryService
  ) {}

  public async UserProfile(userId: string){
    const cashKey = `profile : ${userId}`;

    const cashData = await this.cashService.get<any>(cashKey);

    if (cashData) {
      return cashData;
    }

    const Queries = new GetUserProfileQueries(userId);
    const landloard = await this.QueryHandler.handle(Queries);


    if (!landloard) throw new Error("no user found !!");


    await this.cashService.set(cashKey, landloard, 36000);

    return landloard;
  }

  // public async UpdateUserProfile(
  //   userId: string,
  //   dto: LandlordUpdateProfileRequest
  // ): Promise<any> {
  //   try {
  //     const user = await this.ReadLandlordRep.findLandlordById(userId);
  //     if (!user) throw new Error("no user found !!");

  //     const cashKey = `profile : ${userId}`;
  //     await this.cashService.delete(cashKey);

  //     if (dto.address) user.getUser().setAddress(dto.address);

  //     if (dto.dateOfBirth)
  //       user.getUser().updateDateOfBirth(new UserDateOfBirth(dto.dateOfBirth));

  //     if (dto.name) user.getUser().updateName(new UserName(dto.name));

  //     if (dto.phoneNumber)
  //       user.getUser().updatePhoneNumber(new userPhoneNumber(dto.phoneNumber));

  //     // FIXED LOGIC: Added 'else' to prevent double upload
  //     if (dto.photo) {
  //       const photo = user.getUser().getPhoto();
  //       if (photo) {
  //         let photoDoc: string = await this.fileService.update(
  //           dto.photo,
  //           photo
  //         );
  //         user.getUser().setPhoto(photoDoc);
  //       } else {
  //         let photoDoc: string = await this.fileService.upload(dto.photo);
  //         user.getUser().setPhoto(photoDoc);
  //       }
  //     }

  //     if (dto.newPassword && dto.oldPassword) {
  //       const validatePass = await this.passwordService.compare(
  //         dto.oldPassword,
  //         user.getUser().getPass()
  //       );

  //       if (!validatePass) throw new Error("old pass is not correct");
  //       const newPass = await this.passwordService.hash(dto.newPassword);

  //       if (
  //         await this.passwordService.compare(newPass, user.getUser().getPass())
  //       )
  //         throw new Error("you use this password before");
  //     }

  //     if (dto.cliQAccount) {
  //       user.updateCliQAccount(dto.cliQAccount);
  //     }

  //     await this.landlordRep.updateLandlord(user);

  //     return {
  //       message: "landlord update profile successful ",
  //     };
  //   } catch (error: any) {
  //     console.error("error while updating profile !!", error);
  //     throw error;
  //   }
  // }
}
