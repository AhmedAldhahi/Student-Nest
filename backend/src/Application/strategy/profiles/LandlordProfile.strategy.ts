import { ILandlordRepository } from "../../../Core/repositories/LandlordRepositories.repositories";
import { UserDateOfBirth } from "../../../Core/value-object/UserDateOfBirth.vo";
import { UserName } from "../../../Core/value-object/UserName.vo";
import { userPhoneNumber } from "../../../Core/value-object/UserPhoneNumber.vo";
import { userUpdateProfileRequest } from "../../dtos/profile/adminRequest.updateProfile.profile.dtos";
import { LandlordUpdateProfileRequest } from "../../dtos/profile/LandlordRequest.updateProfile.profile.dtos";
import { IFileStorageService } from "../../interfaces/IFileStorage.interface";
import { IPasswordService } from "../../interfaces/IPassword.interface";
import { IProfileStrategy } from "./IprofileStrategy.strategy";

export class LandlordProfileStrategy implements IProfileStrategy {
  constructor(
    private landlordRep: ILandlordRepository,
    private readonly passwordService: IPasswordService,
    private readonly fileService: IFileStorageService
  ) {}

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

  public async UpdateUserProfile(
    userId: string,
    dto: LandlordUpdateProfileRequest
  ): Promise<any> {
    try {
      const user = await this.landlordRep.findLandlordById(userId);
      if (!user) throw new Error("no user found !!");

      if (dto.address) user.getUser().setAddress(dto.address);

      if (dto.dateOfBirth)
        user.getUser().updateDateOfBirth(new UserDateOfBirth(dto.dateOfBirth));

      if (dto.name) user.getUser().updateName(new UserName(dto.name));

      if (dto.phoneNumber)
        user.getUser().updatePhoneNumber(new userPhoneNumber(dto.phoneNumber));

      if (dto.photo) {
        let photoDoc: string = await this.fileService.upload(dto.photo);
        user.getUser().setPhoto(photoDoc);
      }

      if (dto.newPassword && dto.oldPassword) {
        const validatePass = await this.passwordService.compare(
          dto.oldPassword,
          user.getUser().getPass()
        );

        if (!validatePass) throw new Error("old pass is not correct");
        const newPass = await this.passwordService.hash(dto.newPassword);

        if (
          await this.passwordService.compare(newPass, user.getUser().getPass())
        )
          throw new Error("you use this password before");
      }

      if (dto.cliQAccount) {
        user.updateCliQAccount(dto.cliQAccount);
      }

      await this.landlordRep.updateLandlord(user);

      return {
        message: "landlord update profile successful ",
      };
    } catch (error: any) {
      console.error("error while updating profile !!", error);
      throw error;
    }
  }
}
