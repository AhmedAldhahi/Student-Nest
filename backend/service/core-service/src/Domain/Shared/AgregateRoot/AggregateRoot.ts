import { IDomainEvent } from "../Event/IDomainEvent";

export abstract class AggregateRoot<T> {
  
  protected  readonly _id: T;
  
  private _domainEvents: IDomainEvent[] = [];

  constructor(id: T) {
    this._id = id;
  }

  public get id(): T {
    return this._id;
  }


  public addDomainEvent(event: IDomainEvent): void {
    this._domainEvents.push(event);
  }

 
  public getDomainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }


  public clearDomainEvents(): void {
    this._domainEvents = [];
  }
}