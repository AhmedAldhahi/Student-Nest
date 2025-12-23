import { deleteApartmentByIdCommandHandler } from "../../../Application/Command/Handlers/DeleteApartmentByIdCommandHandler";
import { EditApartmentStatusVerifiedCommandHandler } from "../../../Application/Command/Handlers/EditApartmetVerficationStatusCommandHandler";
import { GetAllApartmentByNameQueriesHandler } from "../../../Application/Querie/Handlers/GetAllApartmentByName.QueriesHandler";
import { GetAllApartmentQueriesHandler } from "../../../Application/Querie/Handlers/GetAllApartmentQueriesHandler";
import { DeleteApartmentByIdUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/DeleteApartment.usecase";
import { EditApartmentStatusVerifiedUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/EditApartmentStatus.usecase";
import { findAllApartmentUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/FindAllApartment.usecase";
import { FindAllApartmentByNameUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/findAllApartmentByName.usecase";
import { ReadApartmentRepositories } from "../../Repositories/Read/ReadApartmentRepositories";
import { UnitOfWork } from "../../Repositories/unitOfWork.repositories";
import { CloudinaryService } from "../../Services/media/CloudinaryService.service";

export function GetAllApartment(): findAllApartmentUseCase {
  // read
  const ReadApartmentRepo = new ReadApartmentRepositories();
  const queriesHandler = new GetAllApartmentQueriesHandler(ReadApartmentRepo);

  return new findAllApartmentUseCase(queriesHandler);
}

export function GetApartmentByName(): FindAllApartmentByNameUseCase {
  const ReadApartmentRepo = new ReadApartmentRepositories();
  const queriesHandler = new GetAllApartmentByNameQueriesHandler(
    ReadApartmentRepo
  );

  return new FindAllApartmentByNameUseCase(queriesHandler);
}

export function EditApartmentStatusVerified(): EditApartmentStatusVerifiedUseCase {
  const uow = new UnitOfWork();
  const ReadApartmentRepo = new ReadApartmentRepositories();

  const commandHandler = new EditApartmentStatusVerifiedCommandHandler(
    uow,
    ReadApartmentRepo
  );

  return new EditApartmentStatusVerifiedUseCase(commandHandler);
}

export function DeleteApartmentById(): DeleteApartmentByIdUseCase {
  const fileService = new CloudinaryService();
  const uow = new UnitOfWork();
  const ReadApartmentRepo = new ReadApartmentRepositories();

  const commandHandler = new deleteApartmentByIdCommandHandler(
    uow,
    ReadApartmentRepo,
    fileService
  );

  return new DeleteApartmentByIdUseCase(commandHandler);
}
