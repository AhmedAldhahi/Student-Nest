import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApartmentModel } from "./Apartment.entity";

@Entity("GoogleMapLocation")
export class GoogleMapLocationModel {
  @PrimaryGeneratedColumn()
  googleMapLocationId: number;

  @Column({ type: "decimal", precision: 11, scale: 8 })
  longitude: number;

  @Column({ type: "decimal", precision: 10, scale: 8 })
  latitude: number;

  @OneToOne(() => ApartmentModel, (apartment) => apartment.location, {
    onDelete: "CASCADE", // If Apartment is deleted, delete this location
  })
  @JoinColumn({ name: "apartmentId" }) // Creates 'apartmentId' column in this table
  apartment: ApartmentModel;
}
