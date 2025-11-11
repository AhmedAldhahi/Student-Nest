import { Entity, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "./User.entity";

@Entity("admins")
export class Admin {
  @PrimaryColumn()
  private adminId: number;

  @OneToOne(() => User, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  private user: User;
}
