import { Entity, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { UserModel } from "./User.entity";

@Entity("admins")
export class AdminModel {
  @PrimaryColumn()
  userId: string;

  @OneToOne(() => UserModel, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: UserModel;
}
