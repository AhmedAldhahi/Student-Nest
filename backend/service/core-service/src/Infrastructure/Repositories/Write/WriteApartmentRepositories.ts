import { EntityManager } from "typeorm";
import { IWriteApartmentRepo } from "../../../Domain/BoundedContexts/Housing/Repositories/IWriteApartmentRepositories.repositories";
import { ApartmentAggregateRoot } from "../../../Domain/BoundedContexts/Housing/AgregateRoot/apartmentEntity.entity";
import { ApartmentMapper } from "../mapper/apartment.mapper";
import { ApartmentModel } from "../../Database/TypeOrm/entity/Apartment.entity";

export class WriteApartmentsRepositories implements IWriteApartmentRepo {
  private manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
  }

  public async deleteApartmentByIdForLandlord(
    id: string,
    userId: string
  ): Promise<void> {
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
