import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { LandlordModel } from "./Landloard.entity";
import { ApartmentDocumentModel } from "./ApartmentDocument.entity";
import { GoogleMapLocationModel } from "./GoogleMapLocation.entity";
import { ApartmentPhotoModel } from "./ApartmentPhoto.entity";

@Entity("apartment")
export class ApartmentModel {
  @PrimaryColumn()
  apartmentId: string;

  @Column({ type: "boolean", nullable: false,default: false })
  isVisible: boolean;

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "varchar", nullable: false })
  description: string;

  @Column({ type: "varchar", nullable: false })
  price: string;

  @Column({ type: "varchar", nullable: false })
  address: string;

  @Column({ type: "boolean", nullable: false, default: false })
  isVerified: boolean;

  @Column({ type: "boolean", nullable: false, default: false })
  isFullyBooked: boolean;

  @Column({ type: "varchar", nullable: false })
  numberOfRoom: string;

  @Column({ type: "varchar", nullable: false })
  numberOfBed: string;

  @Column({ type: "boolean", default: false, nullable: false })
  isJoin: boolean;

  @CreateDateColumn({ name: "createAt" })
  createAt: Date;

  @UpdateDateColumn({ name: "updateAt" })
  updateAt: Date;

  @Column({ nullable: false })
  landlordId: string;

  @ManyToOne(() => LandlordModel, (landlord) => landlord.apartments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "landlordId" })
  landlord: LandlordModel;

  @OneToMany(() => ApartmentDocumentModel, (doc) => doc.apartment, {
    cascade: true,
  })
  documents: ApartmentDocumentModel[];

  @OneToMany(() => ApartmentPhotoModel, (doc) => doc.apartment, {
    cascade: true,
  })
  photos: ApartmentPhotoModel[];

  @OneToOne(() => GoogleMapLocationModel, (loc) => loc.apartment, {
    cascade: true, // Allows saving Apartment + Location in one go
  })
  location: GoogleMapLocationModel;

  // apartment document
}
