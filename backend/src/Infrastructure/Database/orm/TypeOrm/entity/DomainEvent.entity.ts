import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("domain_events_log")
export class StoredEventEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  aggregateId: string; // userId

  @Column()
  eventName: string;

  @Column("text")
  eventBody: string;

  @Column()
  occurredOn: Date;
}
