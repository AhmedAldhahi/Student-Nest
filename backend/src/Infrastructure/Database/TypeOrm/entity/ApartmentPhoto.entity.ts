import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ApartmentModel } from "./Apartment.entity";

@Entity("apartmentPhoto")
export class ApartmentPhotoModel {
  @PrimaryColumn()
  apartmentPhotoId: string;

  @Column({ type: "varchar", nullable: false })
  photoUrl: string;


  @ManyToOne(() => ApartmentModel, (apartment) => apartment.photos, {
    onDelete: "CASCADE", 
  })
  
  @JoinColumn({ name: "apartmentId" })
  apartment: ApartmentModel;
}
