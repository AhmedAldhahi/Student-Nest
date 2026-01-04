import { ApartmentDocumentEntity } from "../../../Domain/Modules/Housing/Entities/apartmentDocumentEntity.entity";
import { IReadApartmentDocumentRepo } from "../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentDocument.repositories";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { ApartmentDocumentModel } from "../../Database/orm/TypeOrm/entity/ApartmentDocument.entity";
import { ApartmentDocumentMapper } from "../mapper/apartmentDocument.mapper";

export class ReadApartmentDocumentRepositories
  implements IReadApartmentDocumentRepo
{
  
  public async findApartmentDocumentById(
    apartmentId: string,
    userId: string
  ): Promise<ApartmentDocumentEntity | null> {
    try {
      const document = await AppDataSource.getInstance()
        .getRepository(ApartmentDocumentModel)
        .findOne({
          where: {
            apartment: { apartmentId: apartmentId },
          },
          relations: { apartment: true },
        });

      // Check if document exists before mapping
      if (!document) return null;

      return ApartmentDocumentMapper.toEntity(document);
    } catch (error: any) {
      console.error("Fail to get apartment documents !!", error);
      throw error;
    }
  }

  public async findApartmentDocumentByIdForLandlord(
    apartmentId: string,
    userId: string
  ): Promise<ApartmentDocumentEntity | null> {
    try {
      const document = await AppDataSource.getInstance()
        .getRepository(ApartmentDocumentModel)
        .findOne({
          where: {
            apartment: {
              apartmentId: apartmentId,
              landlordId: userId,
            },
          },
          relations: { apartment: true },
        });

      return document ? ApartmentDocumentMapper.toEntity(document) : null;
    } catch (error: any) {
      console.error("Fail to get apartment documents !!", error);
      throw error;
    }
  }

  public async findAllApartmentDocument(): Promise<
    ApartmentDocumentEntity[] | null
  > {
    throw new Error("Method not implemented.");
  }
}
