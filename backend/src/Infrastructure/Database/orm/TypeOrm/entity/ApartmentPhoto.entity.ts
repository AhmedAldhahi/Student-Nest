import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApartmentDocumentType } from "../../../../../Domain/Enum/ApartmentDocument.enum";
import { ApartmentModel } from "./Apartment.entity";

@Entity("apartmentPhoto")
export class ApartmentPhotoModel {
  @PrimaryGeneratedColumn()
  apartmentPhotoId: number;

  @Column({ type: "varchar", nullable: false })
  photoUrl: string;

  @ManyToOne(() => ApartmentModel, (apartment) => apartment.photos, {
    onDelete: "CASCADE", // If the apartment is deleted, delete the photos too
  })
  @JoinColumn({ name: "apartmentId" }) // Maps this to the 'apartmentId' column below
  apartment: ApartmentModel;
}
