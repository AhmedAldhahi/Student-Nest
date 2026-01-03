import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ApartmentModel } from "./Apartment.entity";

@Entity("apartmentPhoto")
export class ApartmentPhotoModel {
  @PrimaryColumn()
  apartmentPhotoId: string;

  @Column({ type: "varchar", nullable: false })
  photoUrl: string;

  @Column({ nullable: false })
  apartmentsId: string;

  @ManyToOne(() => ApartmentModel, (apartment) => apartment.photos, {
    onDelete: "CASCADE", // If the apartment is deleted, delete the photos too
  })
  @JoinColumn({ name: "apartmentId" }) // Maps this to the 'apartmentId' column below
  apartment: ApartmentModel;
}
