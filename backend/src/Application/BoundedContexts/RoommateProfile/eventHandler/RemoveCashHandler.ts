import { UpdateRoommateEvent } from "../../../../Domain/BoundedContexts/RommateProfile/Events/UpdateRoommateEvent.event";
import { IHandle } from "../../../../Domain/Shared/Event/IHandle";
import { ICashMemoryService } from "../../../Interfaces/ICash.interface";

export class RemoveCashHandlerForEvent implements IHandle<UpdateRoommateEvent> {
  constructor(private readonly cashService: ICashMemoryService) {}

  public async handle(event: UpdateRoommateEvent): Promise<void> {
    try {
      const cashKey = `profile : ${event.userId}`;
      await this.cashService.delete(cashKey);
    } catch (error: any) {
      console.error("fail to delete from cash memory !!", error);
      throw error;
    }
  }
}
