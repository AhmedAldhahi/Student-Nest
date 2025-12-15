import { ICommand } from "./ICommand";

export interface ICommandHandlers<TCommand extends ICommand> {
  handle(command: TCommand): Promise<any>;
}
