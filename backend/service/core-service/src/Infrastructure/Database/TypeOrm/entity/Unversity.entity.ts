import { Entity, Column, PrimaryColumn, Index } from "typeorm";

@Entity("university")
export class UniversityModel {
  @PrimaryColumn()
  universityId: string;

  @Column({ type: "varchar", length: 100 })
  universityName: string;

  @Column({
    type: "point",
    nullable: false,
  })
  @Index({ spatial: true })
  location: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  address: string;
}
