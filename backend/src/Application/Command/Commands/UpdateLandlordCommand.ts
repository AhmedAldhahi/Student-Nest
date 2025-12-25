import { LandlordUpdateProfileRequest } from "../../DTO/profile/LandlordRequest.updateProfile.profile.dto";
import { ICommand } from "../ICommand";

export class UpdateLandlordCommand implements ICommand {
  public name?: string;
  public newPassword?: string;
  public oldPassword?: string;
  public dateOfBirth?: string;
  public phoneNumber?: string;
  public address?: string;
  public photo?: Express.Multer.File;
  public userId: string;
  public cliQAccount?: string;

  constructor(userId: string, updateData: LandlordUpdateProfileRequest) {
    this.userId = userId;
    this.name = updateData.name;
    this.newPassword = updateData.newPassword;
    this.oldPassword = updateData.oldPassword;
    this.dateOfBirth = updateData.dateOfBirth;
    this.phoneNumber = updateData.phoneNumber;
    this.address = updateData.address;
    this.photo = updateData.photo;
    this.cliQAccount = this.cliQAccount;
  }
}
