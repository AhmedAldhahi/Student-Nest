import { ApartmentDocumentEntity } from "../../../Domain/Entities/apartmentDocument.entity";
import { IReadApartmentDocumentRepo } from "../../../Domain/Repositories/Read/ReadApartmentDocument.repositories";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { ApartmentDocumentModel } from "../../Database/orm/TypeOrm/entity/ApartmentDocument.entity";
import { ApartmentDocumentMapper } from "../mapper/apartmentDocument.mapper";

export class ReadApartmentDocumentRepositories
  implements IReadApartmentDocumentRepo
{
  public async findApartmentDocumentById(
    id: number
  ): Promise<ApartmentDocumentEntity | null> {
    try {
      const apartmentDocument = await AppDataSource.getInstance()
        .getRepository(ApartmentDocumentModel)
        .findOne({
          where: { apartmentDocumentId: id },
          relations: { apartment: true },
        });

      return apartmentDocument
        ? ApartmentDocumentMapper.toEntity(apartmentDocument)
        : null;
    } catch (error: any) {
      console.error("fail to get apartment document !!");
      throw error;
    }
  }
  findAllApartmentDocument(): Promise<ApartmentDocumentEntity[] | null> {
    throw new Error("Method not implemented.");
  }
}
