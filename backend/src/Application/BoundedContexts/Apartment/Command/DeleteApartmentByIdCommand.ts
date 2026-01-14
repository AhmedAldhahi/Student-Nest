import { ICommand } from "../../Shared/abstraction/ICommand";

export class deleteApartmentByIdCommand implements ICommand {
  public id: string;
  public userId: string;
  constructor(id: string, userId: string) {
    this.id = id;
    this.userId = userId;
  }
}
