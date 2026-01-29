import { IDomainEvent } from "./IDomainEvent";

export interface IHandle<T extends IDomainEvent> {
  handle(event: T): Promise<void>;
}