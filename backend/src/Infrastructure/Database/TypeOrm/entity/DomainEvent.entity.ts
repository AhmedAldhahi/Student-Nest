import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DomainEventStatus } from "../../../../Domain/Shared/Enum/DomainEvent.enum";

@Entity("domain_events_log")
export class DomainEventLogModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: false })
  aggregateId: string;

  @Column({ type: "varchar", nullable: false })
  eventName: string;

  @Column({ type: "json", nullable: false })
  payload: any;

  @Column({
    type: "enum",
    enum: DomainEventStatus,
    default: DomainEventStatus.PENDING,
  })
  status: DomainEventStatus;

  @CreateDateColumn()
  occurredOn: Date;
}
