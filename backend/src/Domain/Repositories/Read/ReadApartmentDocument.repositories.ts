import { ApartmentDocumentEntity } from "../../Entities/apartmentDocumentEntity.entity";

export interface IReadApartmentDocumentRepo {
    findApartmentDocumentById(id: number) : Promise<ApartmentDocumentEntity | null>;
    findAllApartmentDocument() : Promise<ApartmentDocumentEntity[] | null>;
}

