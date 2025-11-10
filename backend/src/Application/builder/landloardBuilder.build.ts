import { Landloard } from "../../Core/entites/landloard.entity";
import { UserRole } from "../../Core/enum/UserRole.enum";
import { ILandloardbuilder } from "../../Core/repositories/ILandloardbuilder.build";

export class LandloardBuilder implements ILandloardbuilder {
  private landloard: Landloard; 

  constructor() {
    this.landloard = new Landloard();
  }

  buildDateOfBirth(userBirth: number): this {
    this.landloard.setDateOfBirth(userBirth);
    return this;
  }

  buildHash(userPass: string): this {
    this.landloard.setPass(userPass);
    return this;
  }

  buildName(userName: string): this {
    this.landloard.setName(userName);
    return this;
  }

  buildRole(userRole: UserRole): this {
    this.landloard.setRole(userRole);
    return this;
  }

  buildPhoneNumber(userPhone: string): this {
    this.landloard.setPhoneNumber(userPhone);
    return this;
  }

  buildEmail(userEmail: string): this {
    this.landloard.setEmail(userEmail);
    return this;
  }

  buildAddress(userAddress: string): this {
    this.landloard.setAddress(userAddress);
    return this;
  }

  buildCliqAccount(landloardCliq: string): this {
    this.landloard.setCliQAccount(landloardCliq);
    return this;
  }

  buildLandloardGovId(landloardGovId: string): this {
    this.landloard.setLandloardGovId(landloardGovId);
    return this;
  }

  buildUserId(userId: string): this {
    this.landloard.setUserId(userId);
    return this;
  }



  build(): Landloard {
    if (
      !this.landloard.getUserId() ||
      !this.landloard.getPassword() ||
      !this.landloard.getEmail() ||
      !this.landloard.getName() ||
      !this.landloard.getRole() ||
      !this.landloard.getDateOfBirth() || // This is now correctly set by buildDateOfBirth
      !this.landloard.getPhoeNumber() ||
      !this.landloard.getcliQAccount() ||
      !this.landloard.getLandloardGovId()
    ) {
      // This error will now only fire if a Landlord property is missing.
      throw new Error("Missing required properties to build User.");
    }
    return this.landloard;
  }
}
