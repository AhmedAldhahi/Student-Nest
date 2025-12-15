export interface userUpdateProfileRequest {
  name?: string;

  newPassword?: string;
  oldPassword?: string;

  dateOfBirth?: string;
  phoneNumber?: string;

  address?: string;
  photo?: Express.Multer.File;
}
