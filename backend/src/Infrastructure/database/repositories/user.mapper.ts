import { UserEntity } from "../../../Core/entites/userEntity.entity";
import { OTP } from "../../../Core/value-object/OTP.vo";
import { UserDateOfBirth } from "../../../Core/value-object/UserDateOfBirth.vo";
import { UserEmail } from "../../../Core/value-object/UserEmail.vo";
import { UserName } from "../../../Core/value-object/UserName.vo";
import { userPhoneNumber } from "../../../Core/value-object/UserPhoneNumber.vo";
import { UserModel } from "../orm/TypeOrm/entity/User.entity";
import { UserRole } from "../../../Core/enum/UserRole.enum";

export class UserMapper {
  public static toOrm(user: UserEntity): UserModel {
    const userModel = new UserModel();
    userModel.userId = user.getUserId();
    userModel.Name = user.getName();
    userModel.DateOfBirth = user.getDateOfBirth();
    userModel.Email = user.getEmail();
    userModel.Role = user.getRole();
    userModel.Password = user.getPass();
    userModel.PhoneNumber = user.getPhoneNumber();

    // OTP Email
    userModel.otpCode = user.getOtpForEmail() ?? null;
    userModel.otpExpired = user.getOtpExpiredForEmail() ?? null;
    userModel.emailVerfied = user.getVerifiedEmail();

    // OTP Reset Password
    userModel.OtpResetPasswordCode = user.getOTPForResetPassword() ?? null;
    userModel.OtpExpiredResetPassword =
      user.getOTPExpiredDateForResetPassword() ?? null;
    userModel.resetPasswordVerified = user.getVerifiedResetPassword();

    // Optional
    userModel.Address = user.getAddress();
    userModel.Photo = user.getPhoto();

    return userModel;
  }

  public static toEntity(user: UserModel): UserEntity {
    const userEntity = new UserEntity({
      userId: user.userId,
      name: new UserName(user.Name),
      dateOfBirth: new UserDateOfBirth(user.DateOfBirth),
      email: new UserEmail(user.Email),
      role: user.Role,
      password: user.Password,
      phoneNumber: new userPhoneNumber(user.PhoneNumber),
      address: user.Address,
      photo: user.Photo,
    });

    // Map Email OTP
    if (user.otpCode) {
      userEntity.setOtpForEmail(new OTP(user.otpCode));
    }

    // Map Reset Password OTP
    if (user.OtpResetPasswordCode) {
      userEntity.setOTPForResetPassword(new OTP(user.OtpResetPasswordCode));
    }

    // Map verified flags
    if (user.emailVerfied) {
      userEntity.verifiedEmail();
    }

    if (user.resetPasswordVerified) {
      userEntity.verifyResetPassword(); // ✅ correctly set verified flag
    }

    return userEntity;
  }
}
