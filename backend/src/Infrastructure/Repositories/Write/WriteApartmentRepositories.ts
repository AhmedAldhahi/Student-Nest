import { EntityManager } from "typeorm";
import { IWriteApartmentRepo } from "../../../Domain/Modules/Housing/Repositories/Write/IWriteApartmentRepositories.repositories";
import { ApartmentAggregateRoot } from "../../../Domain/Modules/Housing/AgregateRoot/apartmentEntity.entity";
import { ApartmentMapper } from "../mapper/apartment.mapper";
import { ApartmentModel } from "../../Database/orm/TypeOrm/entity/Apartment.entity";

export class WriteApartmentsRepositories implements IWriteApartmentRepo {
  private manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
  }

  public async deleteApartmentByIdForLandlord(
    id: string,
    userId: string
  ): Promise<void> {

    console.log("--- DELETE DEBUG ---");
    console.log(`Input Apartment ID: '${id}'`); // Single quotes reveal hidden spaces
    console.log(`Input Landlord ID:  '${userId}'`);
    console.log("--------------------");
    try {
      const result = await this.manager
        .createQueryBuilder()
        .delete()
        .from(ApartmentModel)
        .where("apartmentId = :id", { id })
        .andWhere("landlordId =:userId", { userId })
        .execute();

      if (result.affected === 0) {
        throw new Error(
          "OPERATION_FAILED: Apartment not found or you don't own it."
        );
      }
    } catch (error: any) {
      console.error("fail to delete apartments !!", error);
      throw error;
    }
  }

  public async InsertApartment(
    apartment: ApartmentAggregateRoot
  ): Promise<void> {
    const model = ApartmentMapper.toModel(apartment);
    await this.manager.save(ApartmentModel, model);
  }

  public async updateApartment(
    apartment: ApartmentAggregateRoot
  ): Promise<void> {
    const model = ApartmentMapper.toModel(apartment);
    await this.manager.save(ApartmentModel, model);
  }

  public async deleteApartmentById(id: string): Promise<void> {
    this.manager.delete(ApartmentModel, { apartmentId: id });
  }
}
