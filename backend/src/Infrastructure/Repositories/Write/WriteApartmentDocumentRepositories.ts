import { EntityManager } from "typeorm";
import { ApartmentDocumentEntity } from "../../../Domain/Entities/apartmentDocumentEntity.entity";
import { IWriteApartmentDocumentRepo } from "../../../Domain/Repositories/Write/IWriteApartmentDocumentRepositoires.repositories";
import { ApartmentDocumentMapper } from "../mapper/apartmentDocument.mapper";
import { ApartmentDocumentModel } from "../../Database/orm/TypeOrm/entity/ApartmentDocument.entity";

export class WriteApartmentDocumentRepositories implements IWriteApartmentDocumentRepo {
  constructor(private readonly manege: EntityManager) {}

  public async updateApartmentDocument(
    apartmentDoc: ApartmentDocumentEntity
  ): Promise<void> {
    const model = ApartmentDocumentMapper.toModel(apartmentDoc);
    await this.manege.save(ApartmentDocumentModel, model);
  }
}
