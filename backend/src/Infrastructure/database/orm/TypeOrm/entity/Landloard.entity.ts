import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "./User.entity";

@Entity("landlords")
export class Landlord {
  @PrimaryColumn()
  userId: string;

  @OneToOne(() => User, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "varchar", length: 30 })
  cliQAccount: string;

  @Column({ type: "varchar", length: 20 })
  landloardGovId: string;
}
