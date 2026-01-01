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
