import { UserRole } from "../../../Shared/Enum/UserRole.enum";
import { UserDateOfBirth } from "../Value-Object/UserDateOfBirth.vo";
import { UserEmail } from "../Value-Object/UserEmail.vo";
import { UserName } from "../Value-Object/UserName.vo";
import { userPhoneNumber } from "../Value-Object/UserPhoneNumber.vo";

export type UserDataType = {
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
};


