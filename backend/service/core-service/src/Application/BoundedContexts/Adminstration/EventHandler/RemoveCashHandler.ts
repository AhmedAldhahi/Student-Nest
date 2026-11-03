import { UpdateUserEvent } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Events/UpdateUserEvent.event";
import { IHandle } from "../../../../Domain/Shared/Event/IHandle";
import { ICashMemoryService } from "../../../Interfaces/ICash.interface";

export class RemoveCashHandler implements IHandle<UpdateUserEvent> {
  constructor(private readonly cashService: ICashMemoryService) {}

  public async handle(event: UpdateUserEvent): Promise<void> {
    try {
      const cashKey = `profile : ${event.userId}`;
      await this.cashService.delete(cashKey);
    } catch (error: any) {
      console.error("fail to delete from cash memory !!", error);
      throw error;
    }
  }
}
