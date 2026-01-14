// src/Infrastructure/Database/orm/TypeOrm/entity/ApartmentDocument.entity.ts

import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { ApartmentDocumentType } from "../../../../Domain/BoundedContexts/Housing/Enum/ApartmentDocument.enum";
import { ApartmentModel } from "./Apartment.entity";

@Entity("apartmentDocument")
export class ApartmentDocumentModel {
  @PrimaryColumn()
  apartmentDocumentId: string;

  @Column({ type: "enum", enum: ApartmentDocumentType })
  apartmentType: ApartmentDocumentType;

  @Column({ type: "varchar", nullable: false })
  documentUrl: string;

  @Column({ nullable: false })
  apartmentId: string; 

  @OneToOne(() => ApartmentModel, (apartment) => apartment.documents, {
    onDelete: "CASCADE", 
  })
  @JoinColumn({ name: "apartmentId" }) 
  apartment: ApartmentModel;
}