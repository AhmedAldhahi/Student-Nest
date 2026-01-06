import { Unique } from "typeorm";
import { updateLeaseRequestCommandHandler } from "../../../Application/Command/Handlers/Leases/LeaseRequest/updateLeaseRequestCommandHandler";
import { UpdateLeaseRequestUseCase } from "../../../Application/Use-Case/Landlord/LeaseRequest/updateLeaseRequest.usecase";
import { UnitOfWork } from "../../Repositories/unitOfWork.repositories";
import { ReadLandlordRepositories } from "../../Repositories/Read/ReadLandlordRepositories";
import { ReadUserRepositories } from "../../Repositories/Read/ReadUserRepositories";
import { ReadLeaseRequestRepositories } from "../../Repositories/Read/ReadLeaseRequest.Repositories";

export function updateLeastRequestUC(): UpdateLeaseRequestUseCase {
  const uow = new UnitOfWork();
  const readLandlordRepo = new ReadLandlordRepositories();
  const readUserRepo = new ReadUserRepositories();
  const readLeaseRequestRepo = new ReadLeaseRequestRepositories();

  const CH = new updateLeaseRequestCommandHandler(
    uow,
    readUserRepo,
    readLandlordRepo,
    readLeaseRequestRepo
  );

  return new UpdateLeaseRequestUseCase(CH);
}
