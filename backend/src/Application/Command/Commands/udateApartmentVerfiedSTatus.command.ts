import { ICommand } from "../ICommand";

export class EditApartmentVerificationStatus implements ICommand {
  public apartmentId: number;
  public Verified: boolean;

  constructor(apartmentId: number, verified: boolean) {
    this.apartmentId = apartmentId;
    this.Verified = verified;
  }
}
