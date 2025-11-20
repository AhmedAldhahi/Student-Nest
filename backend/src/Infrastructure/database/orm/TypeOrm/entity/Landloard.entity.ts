import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UserModel } from "./User.entity";

@Entity("landlords")
export class LandlordModel {
  @PrimaryColumn()
  userId: string;

  @Column()
  CliQAccount: string;

  @Column()
  LandlordGovId: string;

  @OneToOne(() => UserModel, { cascade: true })
  @JoinColumn({ name: "userId" })
  user: UserModel;
}
