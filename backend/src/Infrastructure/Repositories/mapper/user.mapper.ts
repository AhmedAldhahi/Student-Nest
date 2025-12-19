import { UserResponseDTO } from "../../../Application/Dtos/profile/ UserResponseDTO";
import { UserEntity } from "../../../Domain/Entities/userEntity.entity";
import { OTP } from "../../../Domain/Value-Object/OTP.vo";
import { UserDateOfBirth } from "../../../Domain/Value-Object/UserDateOfBirth.vo";
import { UserEmail } from "../../../Domain/Value-Object/UserEmail.vo";
import { UserName } from "../../../Domain/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../Domain/Value-Object/UserPhoneNumber.vo";
import { UserModel } from "../../Database/orm/TypeOrm/entity/User.entity";

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
      createdAt: user.createAt,
    });

    // Map Email OTP
    if (user.otpCode && user.otpExpired) {
      userEntity.setOtpForEmail(new OTP(user.otpCode, user.otpExpired));
    }

    // Map Reset Password OTP
    if (user.OtpResetPasswordCode && user.OtpExpiredResetPassword) {
      userEntity.setOTPForResetPassword(
        new OTP(user.OtpResetPasswordCode, user.OtpExpiredResetPassword)
      );
    }

    // Map verified flags
    if (user.emailVerfied) {
      userEntity.verifiedEmail();
    }

    if (user.resetPasswordVerified) {
      userEntity.verifyResetPassword();
    }

    return userEntity;
  }

  public static toUserResponse(user: UserModel): UserResponseDTO {
    return {
      userId: user.userId,
      name: new UserName(user.Name).getValue(),
      dateOfBirth: new UserDateOfBirth(user.DateOfBirth).getValue(),
      email: new UserEmail(user.Email).getValue(),
      role: user.Role,
      phoneNumber: new userPhoneNumber(user.PhoneNumber).getValue(),
      address: user.Address,
      photo: user.Photo,
      createdAt: user.createAt,
      emailVerfied: user.emailVerfied,
    };
  }
}
