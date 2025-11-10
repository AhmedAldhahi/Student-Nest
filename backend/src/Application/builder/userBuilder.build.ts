import { IUserBuilder } from "../../Core/repositories/IUserBuilder.builder";
import { User } from "../../Core/entites/user.entity";
import { UserRole } from "../../Core/enum/UserRole.enum";

export class UserBuilder implements IUserBuilder {
  private user: User;

  constructor() {
    this.user = new User();
  }

  buildUserId(userId: string): this {
    this.user.setUserId(userId);
    return this;
  }

  buildHash(userPass: string): this {
    this.user.setPass(userPass);
    return this;
  }

  buildName(userName: string): this {
    this.user.setName(userName);
    return this;
  }

  buildEmail(userEmail: string): this {
    this.user.setEmail(userEmail);
    return this;
  }

  buildRole(userRole: UserRole): this {
    this.user.setRole(userRole);
    return this;
  }

  buildDateOfBirth(userBirth: number): this {
    this.user.setDateOfBirth(userBirth);
    return this;
  }

  buildPhoneNumber(userPhone: string): this {
    this.user.setPhoneNumber(userPhone);
    return this;
  }

  buildAddress(userAddress: string): this {
    this.user.setAddress(userAddress);
    return this;
  }

  build(): User {
    if (
      !this.user.getUserId() ||
      !this.user.getPassword() ||
      !this.user.getEmail() ||
      !this.user.getName() ||
      !this.user.getRole() ||
      !this.user.getDateOfBirth() ||
      !this.user.getPhoeNumber()
    ) {
      throw new Error("Missing required properties to build User.");
    }

    return this.user;
  }
}
