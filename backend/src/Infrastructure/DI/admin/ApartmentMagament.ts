import { GetAllApartmentQueriesHandler } from "../../../Application/Querie/Handlers/GetAllApartmentQueriesHandler";
import { findAllApartmentUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/FindAllApartment.usecase";
import { ReadApartmentRepositories } from "../../Repositories/Read/ReadApartmentRepositories";

export function GetAllApartment(): findAllApartmentUseCase {
  // read
  const ReadApartmentRepo = new ReadApartmentRepositories();
  const queriesHandler = new GetAllApartmentQueriesHandler(ReadApartmentRepo);

  return new findAllApartmentUseCase(queriesHandler);
}
