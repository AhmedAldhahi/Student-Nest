import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { UserModel } from "./User.entity";
import { LeaseModel } from "./Lease.entity";

@Entity("landlords")
export class LandlordModel {
  @PrimaryColumn()
  userId: string;

  @Column()
  CliQAccount: string;

  @Column()
  LandlordGovId: string;

  @Column({ default: false })
  Verified: boolean;

  @Column()
  document: string;

  @OneToOne(() => UserModel, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: UserModel;

  @OneToMany(() => LeaseModel, (lease) => lease.landlord)
  leases: LeaseModel[]; 

  


}
