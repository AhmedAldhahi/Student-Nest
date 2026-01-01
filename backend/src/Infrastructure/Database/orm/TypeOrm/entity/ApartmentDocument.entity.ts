import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ApartmentDocumentType } from "../../../../../Domain/Shared/Enum/ApartmentDocument.enum";
import { ApartmentModel } from "./Apartment.entity";

@Entity("apartmentDocument")
export class ApartmentDocumentModel {
  @PrimaryColumn()
  apartmentDocumentId: string;

  @Column({ type: "enum", enum: ApartmentDocumentType })
  apartmentType: ApartmentDocumentType;

  @Column({ type: "varchar", nullable: false })
  documentUrl: string;

  @ManyToOne(() => ApartmentModel, (apartment) => apartment.documents, {
    onDelete: "CASCADE", // If the apartment is deleted, delete the photos too
  })
  @JoinColumn({ name: "apartmentId" }) // Maps this to the 'apartmentId' column below
  apartment: ApartmentModel;
}
