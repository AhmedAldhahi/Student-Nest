import { ICommand } from "../../ICommand";

export class deleteApartmentByIdCommand implements ICommand {
  public id: string;
  constructor(id: string) {
    this.id = id;
  }
}
