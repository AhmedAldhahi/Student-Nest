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
  ): Promise<ApartmentDocumentEntity[]> {
    try {
      const documents = await AppDataSource.getInstance()
        .getRepository(ApartmentDocumentModel)
        .find({
          where: {
            // Check relation: Apartment ID
            apartment: { apartmentId: apartmentId },
          },
          relations: { apartment: true },
        });

      // Map array to entities
      return documents.map((doc) => ApartmentDocumentMapper.toEntity(doc));
    } catch (error: any) {
      console.error("Fail to get apartment documents !!", error);
      throw error;
    }
  }

  public async findApartmentDocumentByIdForLandlord(
    apartmentId: string,
    userId: string
  ): Promise<ApartmentDocumentEntity[]> {
    try {
      const documents = await AppDataSource.getInstance()
        .getRepository(ApartmentDocumentModel)
        .find({
          where: {
            apartment: {
              apartmentId: apartmentId,
              landlordId: userId, // Security check
            },
          },
          relations: { apartment: true },
        });

      return documents.map((doc) => ApartmentDocumentMapper.toEntity(doc));
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
