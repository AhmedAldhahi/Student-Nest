import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { ApartmentModel } from "./Apartment.entity";

@Entity("GoogleMapLocation")
export class GoogleMapLocationModel {
  @PrimaryColumn()
  googleMapLocationId: string;

  @Column({ type: "varchar", nullable: false })
  longitude: string;

  @Column({ type: "varchar", nullable: false })
  latitude: string;

  @OneToOne(() => ApartmentModel, (apartment) => apartment.location, {
    onDelete: "CASCADE", // If Apartment is deleted, delete this location
  })
  @JoinColumn({ name: "apartmentId", referencedColumnName: "apartmentId" }) // Creates 'apartmentId' column in this table
  apartment: ApartmentModel;
}
