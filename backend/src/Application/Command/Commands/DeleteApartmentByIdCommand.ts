import { ICommand } from "../ICommand";

export class deleteApartmentByIdCommand implements ICommand {
  public id: number;
  constructor(id: number) {
    this.id = id;
  }
}
