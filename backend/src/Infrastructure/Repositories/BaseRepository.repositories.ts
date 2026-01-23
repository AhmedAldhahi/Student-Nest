import { EntityManager } from "typeorm";
import { AggregateRoot } from "../../Domain/Shared/AgregateRoot/AggregateRoot"; 
import { DomainEventStatus } from "../../Domain/Shared/Enum/DomainEvent.enum"; 
import { DomainEventLogModel } from "../Database/TypeOrm/entity/DomainEvent.entity";

export abstract class BaseRepository<T extends AggregateRoot<any>> {
  constructor(protected manager: EntityManager) {}

  public async save(aggregate: T): Promise<void> {
    await this.persistAggregate(aggregate);

    await this.saveDomainEvents(aggregate);
  }

  protected abstract persistAggregate(aggregate: T): Promise<void>;

  private async saveDomainEvents(aggregate: T): Promise<void> {
    const domainEvents = aggregate.getDomainEvents();

    if (!domainEvents || domainEvents.length === 0) {
      return;
    }

    const eventLogs = domainEvents.map((event: any) => {
      const log = new DomainEventLogModel();
      log.aggregateId = event.getAggregateId();
      log.eventName = event.getEventName();
      log.payload = event;
      log.status = DomainEventStatus.PENDING;
      return log;
    });

    await this.manager.save(DomainEventLogModel, eventLogs);

    aggregate.clearDomainEvents();
  }
}
