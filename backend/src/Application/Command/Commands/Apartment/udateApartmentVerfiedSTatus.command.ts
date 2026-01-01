import { ICommand } from "../../ICommand";

export class EditApartmentVerificationStatus implements ICommand {
  public apartmentId: string;
  public Verified: boolean;

  constructor(apartmentId: string, verified: boolean) {
    this.apartmentId = apartmentId;
    this.Verified = verified;
  }
}
