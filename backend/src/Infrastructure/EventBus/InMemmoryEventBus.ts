import { DomainEventDispatcher } from "../../Domain/Shared/Event/DomainEventDispatcher";
import { IDomainEvent } from "../../Domain/Shared/Event/IDomainEvent";
import { IEventBus } from "../../Domain/Shared/Event/IEventBus";

export class InMemoryEventBus implements IEventBus {
  constructor(private readonly dispatcher: DomainEventDispatcher) {}

  async publish(event: IDomainEvent): Promise<void> {
    await this.dispatcher.dispatch(event);
  }
}
