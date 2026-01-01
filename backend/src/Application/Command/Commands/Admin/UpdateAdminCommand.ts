import { userUpdateProfileRequest } from "../../../DTO/profile/adminRequest.updateProfile.profile.dto";
import { ICommand } from "../../ICommand";

export class UpdateAdminCommand implements ICommand {
  public name?: string;
  public newPassword?: string;
  public oldPassword?: string;
  public dateOfBirth?: string;
  public phoneNumber?: string;
  public address?: string;
  public photo?: Express.Multer.File;
  public userId: string;

  constructor(userId: string, updateData: userUpdateProfileRequest) { 
    this.userId = userId;
    this.name = updateData.name;
    this.newPassword = updateData.newPassword;
    this.oldPassword = updateData.oldPassword;
    this.dateOfBirth = updateData.dateOfBirth;
    this.phoneNumber = updateData.phoneNumber;
    this.address = updateData.address;
    this.photo = updateData.photo;
  }
}
