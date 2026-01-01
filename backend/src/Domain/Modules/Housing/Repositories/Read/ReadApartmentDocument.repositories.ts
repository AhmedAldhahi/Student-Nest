import { ApartmentDocumentEntity } from "../../Entities/apartmentDocumentEntity.entity";

export interface IReadApartmentDocumentRepo {
    findApartmentDocumentById(id: string) : Promise<ApartmentDocumentEntity | null>;
    findAllApartmentDocument() : Promise<ApartmentDocumentEntity[] | null>;
}

