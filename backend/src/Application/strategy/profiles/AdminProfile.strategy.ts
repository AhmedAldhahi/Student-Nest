import { IUserRepository } from "../../../Core/repositories/UserRepositories.repositories";
import { UserDateOfBirth } from "../../../Core/value-object/UserDateOfBirth.vo";
import { UserName } from "../../../Core/value-object/UserName.vo";
import { userPhoneNumber } from "../../../Core/value-object/UserPhoneNumber.vo";
import { userUpdateProfileRequest } from "../../dtos/profile/adminRequest.updateProfile.profile.dtos";
import { ICashMemoryService } from "../../interfaces/ICash.interface";
import { IFileStorageService } from "../../interfaces/IFileStorage.interface";
import { IPasswordService } from "../../interfaces/IPassword.interface";
import { IProfileStrategy } from "./IprofileStrategy.strategy";

export class AdminProfileStrategy implements IProfileStrategy {
  constructor(
    private readonly userRep: IUserRepository,
    private readonly passworderService: IPasswordService,
    private readonly fileService: IFileStorageService,
    private readonly cashService: ICashMemoryService
  ) {}
  public async UserProfile(userId: string): Promise<any> {
    const cashKey = `profile : ${userId}`;

    const cashData = await this.cashService.get<any>(cashKey);

    if (cashData) {
      return cashData;
    }

    const user = await this.userRep.findById(userId);
    if (!user) throw new Error("no user");

    const profileData = {
      user: {
        userId: user.getUserId(),
        email: user.getEmail(),
        name: user.getName(),
        role: user.getRole(),
        dateOfBirth: user.getDateOfBirth(),
        phoneNumber: user.getPhoneNumber(),

        address: user.getAddress(),
        photo: user.getPhoto() || null,
        createAt: user.getCreatedAt(),
      },
    };

    await this.cashService.set(cashKey, profileData, 36000);

    return profileData;
  }

  public async UpdateUserProfile(
    userId: string,
    dto: userUpdateProfileRequest
  ): Promise<any> {
    try {
      const user = await this.userRep.findById(userId);
      if (!user) throw new Error("no user found !!");

      const cashKey = `profile : ${userId}`;
      await this.cashService.delete(cashKey);

      // Update fields
      if (dto.address) user.setAddress(dto.address);

      if (dto.dateOfBirth)
        user.updateDateOfBirth(new UserDateOfBirth(dto.dateOfBirth));

      if (dto.name) user.updateName(new UserName(dto.name));

      if (dto.phoneNumber)
        user.updatePhoneNumber(new userPhoneNumber(dto.phoneNumber));

      if (dto.photo) {
        const photo = user.getPhoto();
        if (photo) {
          let photoDoc: string = await this.fileService.update(
            dto.photo,
            photo
          );
          user.setPhoto(photoDoc);
        }
        let photoDoc: string = await this.fileService.upload(dto.photo);
        user.setPhoto(photoDoc);
      }

      if (dto.newPassword && dto.oldPassword) {
        const validatePass = await this.passworderService.compare(
          dto.oldPassword,
          user.getPass()
        );

        if (!validatePass) throw new Error("old pass is not correct");
        const newPass = await this.passworderService.hash(dto.newPassword);

        if (await this.passworderService.compare(newPass, user.getPass()))
          throw new Error("you use this password before");

        user.setPassword(newPass);
      }

      // Save the updated user
      await this.userRep.updateUser(user);

      // Return success message
      return {
        message: "Admin profile updated successfully",
      };
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
      throw error; // Optionally re-throw the error if you need it to propagate
    }
  }
}
