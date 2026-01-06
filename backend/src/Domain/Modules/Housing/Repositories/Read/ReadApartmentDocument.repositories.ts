import { ApartmentDocumentEntity } from "../../Entities/apartmentDocumentEntity.entity";

export interface IReadApartmentDocumentRepo {
  findApartmentDocumentById(
    id: string,
    userId: string
  ): Promise<ApartmentDocumentEntity | null>;
  findApartmentDocumentByIdForLandlord(
    id: string,
    userId: string
  ): Promise<ApartmentDocumentEntity | null>;

  findAllApartmentDocument(): Promise<ApartmentDocumentEntity[] | null>;


}

