import { Landloard } from "../entites/landloard.entity";
import { UserRole } from "../enum/UserRole.enum";

export interface ILandloardbuilder {
  buildCliqAccount(landloardCliq: string): this;
  buildLandloardGovId(landloardGovId: string): this;

  buildDateOfBirth(userBirth: Date): this;

  buildHash(userPass: string): this;

  buildName(userName: string): this;

  buildRole(userRole: UserRole): this;

  buildPhoneNumber(userPhone: string): this;

  buildEmail(userEmail: string): this;

  buildAddress(userAddress: string): this;
  build(): Landloard;
}
