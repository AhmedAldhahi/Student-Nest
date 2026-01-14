import { IDomainEvent } from "./IDomainEvent";
import { IHandle } from "./IHandle";

export class DomainEventDispatcher {
  private handlersMap: Map<string, IHandle<IDomainEvent>[]> = new Map();

  public register<T extends IDomainEvent>(
    eventName: string,
    handler: IHandle<T>
  ): void {
    const handlers = this.handlersMap.get(eventName) || [];
    handlers.push(handler as IHandle<IDomainEvent>);
    this.handlersMap.set(eventName, handlers);
  }
  

  
  public async dispatch(event: IDomainEvent): Promise<void> {
    const eventName = event.getEventName();

    const handlers = this.handlersMap.get(eventName);

    if (handlers && handlers.length > 0) {
      const promises = handlers.map(async (handler) => {
        try {
          await handler.handle(event);
        } catch (err) {
          console.error(`Error handling event ${eventName}:`, err);
        }
      });

      await Promise.allSettled(promises);
    }
  }

  public clearHandlers(): void {
    this.handlersMap.clear();
  }
}
