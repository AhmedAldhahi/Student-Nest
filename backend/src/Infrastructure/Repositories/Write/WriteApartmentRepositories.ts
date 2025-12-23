import { EntityManager } from "typeorm";
import { IWriteApartmentRepo } from "../../../Domain/Repositories/Write/IWriteApartmentRepositories.repositories";
import { ApartmentAggregateRoot } from "../../../Domain/AggregatesRoot/apartmentEntity.entity";
import { ApartmentMapper } from "../mapper/apartment.mapper";
import { ApartmentModel } from "../../Database/orm/TypeOrm/entity/Apartment.entity";

export class WriteApartmentsRepositories implements IWriteApartmentRepo {
  private manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
  }

  public async updateApartment(apartment: ApartmentAggregateRoot): Promise<void> {
    const model = ApartmentMapper.toModel(apartment);
    await this.manager.save(ApartmentModel, model);
  }

  public async deleteApartmentById(id: number): Promise<void> {
    this.manager.delete(ApartmentModel, { apartmentId: id });
  }
}
