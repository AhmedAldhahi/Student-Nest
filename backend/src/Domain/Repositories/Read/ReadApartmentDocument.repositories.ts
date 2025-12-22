import { ApartmentDocumentEntity } from "../../Entities/apartmentDocument.entity";

export interface IReadApartmentDocumentRepo {
    findApartmentDocumentById(id: number) : Promise<ApartmentDocumentEntity | null>;
    findAllApartmentDocument() : Promise<ApartmentDocumentEntity[] | null>;
}

