import { UserRole } from "../../../Shared/Enum/UserRole.enum";
import { UserDateOfBirth } from "../../../Shared/Value-Object/UserDateOfBirth.vo";
import { UserEmail } from "../../../Shared/Value-Object/UserEmail.vo";
import { UserName } from "../../../Shared/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../Shared/Value-Object/UserPhoneNumber.vo";

export interface IUserDataType {
  userId: string;
  password: string;
  name: UserName;
  dateOfBirth: UserDateOfBirth;
  phoneNumber: userPhoneNumber;
  email: UserEmail;
  role: UserRole;
  address?: string;
  photo?: string;
  createdAt: Date;
}