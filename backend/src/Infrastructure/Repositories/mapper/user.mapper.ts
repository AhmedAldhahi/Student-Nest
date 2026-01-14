import { UserEntity } from "../../../Domain/BoundedContexts/IdentityAndAccess/Entities/userEntity.entity";
import { UserResponseDTO } from "../../../Domain/BoundedContexts/IdentityAndAccess/Representations/UserResponseDTO";
import { OTP } from "../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/OTP.vo";
import { UserDateOfBirth } from "../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserDateOfBirth.vo";
import { UserEmail } from "../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserEmail.vo";
import { UserName } from "../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserPhoneNumber.vo";
import { UserModel } from "../../Database/TypeOrm/entity/User.entity";

export class UserMapper {
  public static toOrm(user: UserEntity): UserModel {
    const dateValidation = this.toModelValidation(user);
    const userModel = new UserModel();

    userModel.userId = user.getUserId();
    userModel.Name = dateValidation.name;
    userModel.DateOfBirth = dateValidation.DateOfBirth;
    userModel.Email = dateValidation.email;
    userModel.Role = dateValidation.role;
    userModel.Password = dateValidation.password;
    userModel.PhoneNumber = dateValidation.phoneNumber;
    userModel.isActive = user.getAccountStatus();

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

  private static toModelValidation(user: UserEntity) {
    const name = user.getName();
    const DateOfBirth = user.getDateOfBirth();
    const email = user.getEmail();
    const role = user.getRole();
    const password = user.getPass();
    const phoneNumber = user.getPhoneNumber();

    if (!name) throw new Error("Cannot save user, name is require !!");
    if (!DateOfBirth)
      throw new Error("Cannot save user, date of birth is require !!");
    if (!email) throw new Error("Cannot save user, email is require !!");
    if (!role) throw new Error("Cannot save user, role is require !!");
    if (!password) throw new Error("Cannot save user, password is require !!");
    if (!phoneNumber)
      throw new Error("Cannot save user, phone number is require !!");

    return { name, DateOfBirth, email, role, password, phoneNumber };
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
      name: user.Name,
      dateOfBirth: user.DateOfBirth,
      email: user.Email,
      role: user.Role,
      phoneNumber: user.PhoneNumber,
      address: user.Address,
      photo: user.Photo,
      createdAt: user.createAt,
      emailVerified: user.emailVerfied,
    };
  }
}
