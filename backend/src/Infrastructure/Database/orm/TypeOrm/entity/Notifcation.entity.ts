import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserModel } from "./User.entity";

@Entity("notification")
export class NotificationModel {
  @PrimaryGeneratedColumn()
  notificationId: number;

  @Column({ type: "text", nullable: false })
  message: string;

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "boolean", default: false })
  isRead: boolean;

  @CreateDateColumn({ name: "createAt" })
  createAt: Date;

  @ManyToOne(() => UserModel, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "senderId" })
  sender: UserModel | null;

  @ManyToOne(() => UserModel, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "receiverId" })
  receiver: UserModel;
}
