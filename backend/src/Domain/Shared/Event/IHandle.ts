import { IDomainEvent } from "./IDomainEvent";

export interface IHandle<E extends IDomainEvent> {
  setup(event: E): Promise<void>;
}
