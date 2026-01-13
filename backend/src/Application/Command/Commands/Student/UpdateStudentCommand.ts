import { StudentUpdateProfileRequest } from "../../../DTO/shared/profile/StudentRequest.updateProfile.profile.dto";
import { ICommand } from "../../ICommand";

export class UpdateStudentCommand implements ICommand {
  public name?: string;
  public newPassword?: string;
  public oldPassword?: string;
  public dateOfBirth?: string;
  public phoneNumber?: string;
  public address?: string;
  public photo?: Express.Multer.File;
  public userId: string;
  public cliQAccount?: string;

  public major?: string;
  public gradateYear?: number;
  public studentCardId?: string;
  public universityName?: string;
  public verificationFile?: Express.Multer.File;

  constructor(userId: string, updateData: StudentUpdateProfileRequest) {
    this.userId = userId;
    this.name = updateData.name;
    this.newPassword = updateData.newPassword;
    this.oldPassword = updateData.oldPassword;
    this.dateOfBirth = updateData.dateOfBirth;
    this.phoneNumber = updateData.phoneNumber;
    this.address = updateData.address;
    this.photo = updateData.photo;
    this.cliQAccount = this.cliQAccount;

    this.major = updateData.major;
    this.gradateYear = updateData.gradateYear;
    this.universityName = updateData.universityName;
    this.studentCardId = updateData.studentCardId;
    this.verificationFile = updateData.verificationFile;
  }
}
