import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { UserModel } from "./User.entity";
import { LeaseModel } from "./Lease.entity";
import { ApartmentModel } from "./Apartment.entity";

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

  @OneToMany(() => ApartmentModel, (apartment) => apartment.landlord)
  apartments: ApartmentModel[];
}
