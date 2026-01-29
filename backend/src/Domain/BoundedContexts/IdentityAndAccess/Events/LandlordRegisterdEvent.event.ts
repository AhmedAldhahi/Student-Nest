import { EVENT_KEY } from "../../../../Shared/constants/EventHelper.constant";
import { IDomainEvent } from "../../../Shared/Event/IDomainEvent";

export class LandlordRegisterEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public static EVENT_KEY = EVENT_KEY.LANDLORD_REGISTER;
  constructor(public userId: string) {}

  public getAggregateId(): string {
    return this.userId;
  }
  public getEventName(): string {
    return LandlordRegisterEvent.EVENT_KEY;
  }
}
