import { IDomainEvent } from "../Event/IDomainEvent";

export abstract class AggregateRoot<T> {
  
  protected _id: T;
  
  private _domainEvents: IDomainEvent[] = [];

  public get id(): T {
    return this._id;
  }


  protected addDomainEvent(event: IDomainEvent): void {
    this._domainEvents.push(event);
  }

 
  public getDomainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }


  public clearDomainEvents(): void {
    this._domainEvents = [];
  }
}