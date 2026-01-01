import { IDomainEvent } from "./IDomainEvent";
import { IHandle } from "./IHandle";

export class DomainEventDispatcher {
  private static handlers = new Map<string, IHandle<any>[]>();


  public static register<T extends IDomainEvent>(
    eventName: string,
    handler: IHandle<T>
  ): void {
    const handlers = this.handlers.get(eventName) || [];
    handlers.push(handler);
    this.handlers.set(eventName, handlers);
  }


  public static async dispatch(event: IDomainEvent): Promise<void> {
    const eventName = event.constructor.name;
    const handlers = this.handlers.get(eventName);

    if (handlers) {
      for (const handler of handlers) {
        try {
          await handler.setup(event);
        } catch (err) {
          console.error(`Error handling event ${eventName}:`, err);
        }
      }
    }
  }

  

  public static clearHandlers(): void {
    this.handlers.clear();
  }
}