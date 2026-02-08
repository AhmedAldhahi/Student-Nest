import { RoommateProfileEvent } from "../../../../Domain/BoundedContexts/RommateProfile/Events/UpdateRoommateEvent.event";
import { IHandle } from "../../../../Domain/Shared/Event/IHandle";
import { CacheKeys } from "../../../../Shared/constants/CacheKeys.constant";
import { ICashMemoryService } from "../../../Interfaces/ICash.interface";
export class RemoveCashHandlerForRoommateEvent implements IHandle<RoommateProfileEvent> {
  constructor(private readonly cashService: ICashMemoryService) {}

  public async handle(event: RoommateProfileEvent): Promise<void> {
    try {
      const cashKey = CacheKeys.Profile(event.userId);
      await this.cashService.delete(cashKey);
    } catch (error: any) {
      console.error("fail to delete from cash memory !!", error);
      throw error;
    }
  }
}
