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

  // ✅ FIX: Add onDelete: "CASCADE" here
  @OneToOne(() => UserModel, { 
      cascade: true, 
      onDelete: "CASCADE" // This tells MySQL: "If User is deleted, delete this Landlord too"
  })
  @JoinColumn({ name: "userId" })
  user: UserModel;
}