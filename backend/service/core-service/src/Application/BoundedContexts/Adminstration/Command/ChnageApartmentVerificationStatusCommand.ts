import { ICommand } from "../../Shared/abstraction/ICommand";

export class ChangeApartmentVerificationStatus implements ICommand {
  public apartmentId: string;
  public Verified: boolean;

  constructor(apartmentId: string, verified: boolean) {
    this.apartmentId = apartmentId;
    this.Verified = verified;
  }
}
