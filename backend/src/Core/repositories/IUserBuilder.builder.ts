import { User } from "../entites/user.entity";
import { UserRole } from "../enum/UserRole.enum";

export interface IUserBuilder  {
  buildUserId(userId: string): this;

  buildDateOfBirth(userBirth: Date): this;

  buildHash(userPass: string): this;

  buildName(userName: string): this;

  buildRole(userRole: UserRole): this;

  buildPhoneNumber(userPhone: string): this;

  buildEmail(userEmail: string): this;

  buildAddress(userAddress: string): this; // optional
  
  build(): User;
}

// isActvieAccount
