import { IDomainEvent } from "../../../Shared/Event/IDomainEvent";

export class ResendOtpEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public static EVENT_KEY = "Identity.resend.otp";

  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly otpCode: string
  ) {}

  public getAggregateId(): string {
    return this.userId;
  }
  public getEventName(): string {
    return ResendOtpEvent.EVENT_KEY;
  }
}
