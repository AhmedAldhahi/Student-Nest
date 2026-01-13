import { updateLeaseRequestCommandHandler } from "../../../Application/Command/Handlers/Leases/LeaseRequest/updateLeaseRequestCommandHandler";
import { UpdateLeaseRequestUseCase } from "../../../Application/Use-Case/Landlord/LeaseRequest/updateLeaseRequest.usecase";
import { UnitOfWork } from "../../Repositories/unitOfWork.repositories";
import { ReadLandlordRepositories } from "../../Repositories/Read/ReadLandlordRepositories";
import { ReadUserRepositories } from "../../Repositories/Read/ReadUserRepositories";
import { ReadLeaseRequestRepositories } from "../../Repositories/Read/ReadLeaseRequest.Repositories";
import { GetAllLeastRequestForSingleApartmentQueriesHandler } from "../../../Application/Queries/Handlers/Leases/LeaseRequest/GetAllLeaseRequestForLandlordForSingleApartmentQueriesHandler";
import { SearchForLeaseRequestForSingleApartmentsUseCase } from "../../../Application/Use-Case/Landlord/LeaseRequest/SeachForLeaseRequestForSingleApartment.usecase";
import { SearchForAllLeaseRequestForLandlordForSingleApartment } from "../../../Application/Queries/Handlers/Leases/LeaseRequest/SeachForAllLeasRequestForSingleApartmentQueriesHandler";
import { GetForLeasesRequestForSingleApartmentUseCase } from "../../../Application/Use-Case/Landlord/LeaseRequest/GetForLeasesRequestForSingleApartment.usecase";

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

export function getAllLeasesRequestForLandlordForSingleApartmentUC(): GetForLeasesRequestForSingleApartmentUseCase {
  const readUserRepo = new ReadUserRepositories();
  const readLeaseRequestRepo = new ReadLeaseRequestRepositories();

  const QH = new GetAllLeastRequestForSingleApartmentQueriesHandler(
    readUserRepo,
    readLeaseRequestRepo
  );

  return new GetForLeasesRequestForSingleApartmentUseCase(QH);
}

export function SearchForLeasesRequestForLandlordForSingleApartmentUC(): SearchForLeaseRequestForSingleApartmentsUseCase {
  const readUserRepo = new ReadUserRepositories();
  const readLeaseRequestRepo = new ReadLeaseRequestRepositories();

  const QH = new SearchForAllLeaseRequestForLandlordForSingleApartment(
    readUserRepo,
    readLeaseRequestRepo
  );

  return new SearchForLeaseRequestForSingleApartmentsUseCase(QH);
}
