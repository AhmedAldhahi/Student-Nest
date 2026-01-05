import { GetAllLeaseForSingleApartmentQueriesHandler } from "../../../Application/Queries/Handlers/Leases/Lease/GetAllLeaseForSingleApartmentQueriesHandler";
import { SearchForAllLeaseForLandlordForSingleApartment } from "../../../Application/Queries/Handlers/Leases/Lease/SearchForLeaseForSingleApartmentQueriesHandler";
import { GetAllLeaseForLandlordForSingleApartmentUseCase } from "../../../Application/Use-Case/Landlord/LeaseMangement/GetAllLeaseForLandlordForSingleApartment.usecase";
import { SearchForAllLeaseForLandlordForSingleApartmentUseCase } from "../../../Application/Use-Case/Landlord/LeaseMangement/SeachLeaseForLandlordForSingleApartment.usecase";
import { ReadLeaseRepositories } from "../../Repositories/Read/ReadLeaseRepositories";
import { ReadUserRepositories } from "../../Repositories/Read/ReadUserRepositories";

export function SearchForAllLeaseForSingleApartmentUC(): SearchForAllLeaseForLandlordForSingleApartmentUseCase {
  const userRepo = new ReadUserRepositories();
  const LeaseRepo = new ReadLeaseRepositories();

  const SearchQH = new SearchForAllLeaseForLandlordForSingleApartment(
    userRepo,
    LeaseRepo
  );
  return new SearchForAllLeaseForLandlordForSingleApartmentUseCase(SearchQH);
}

export function GetForAllLeaseForSingleApartmentUC(): GetAllLeaseForLandlordForSingleApartmentUseCase {
  const userRepo = new ReadUserRepositories();
  const LeaseRepo = new ReadLeaseRepositories();

  const getQH = new GetAllLeaseForSingleApartmentQueriesHandler(
    userRepo,
    LeaseRepo
  );
  return new GetAllLeaseForLandlordForSingleApartmentUseCase(getQH);
}
