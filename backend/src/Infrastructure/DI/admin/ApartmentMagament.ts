import { deleteApartmentByIdCommandHandler } from "../../../Application/Command/Handlers/DeleteApartmentByIdCommandHandler";
import { EditApartmentStatusVerifiedCommandHandler } from "../../../Application/Command/Handlers/EditApartmetVerficationStatusCommandHandler";
import { GetAllApartmentByNameQueriesHandler } from "../../../Application/Querie/Handlers/GetAllApartmentByName.QueriesHandler";
import { GetAllApartmentQueriesHandler } from "../../../Application/Querie/Handlers/GetAllApartmentQueriesHandler";
import { GetApartmentByIdQueriesHandler } from "../../../Application/Querie/Handlers/GetApartmentByIdQueriesHandler";
import { GetApartmentDocumentByIdQueriesHandler } from "../../../Application/Querie/Handlers/GetApartmentDocumentById.QueriesHandler";
import { DeleteApartmentByIdUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/DeleteApartment.usecase";
import { EditApartmentStatusVerifiedUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/EditApartmentStatus.usecase";
import { findAllApartmentUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/FindAllApartment.usecase";
import { FindAllApartmentByNameUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/findAllApartmentByName.usecase";
import { findApartmentByIdUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/FindApartmentDetailsById.usecase";
import { findApartmentDocumentByIdUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/FindApartmentDocument.usecase";
import { ReadApartmentDocumentRepositories } from "../../Repositories/Read/ReadApartmentDocumentRepositories";
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

export function FindApartmentDocumentByIdUseCase(): findApartmentDocumentByIdUseCase {
  const apartmentDocumentRepo = new ReadApartmentDocumentRepositories();
  const QueriesHandler = new GetApartmentDocumentByIdQueriesHandler(
    apartmentDocumentRepo
  );

  return new findApartmentDocumentByIdUseCase(QueriesHandler);
}

export function FindApartmentDetailByIdUseCase(): findApartmentByIdUseCase {
  const ReadApartmentRepo = new ReadApartmentRepositories();

  const queriesHandler = new GetApartmentByIdQueriesHandler(ReadApartmentRepo);

  return new findApartmentByIdUseCase(queriesHandler);
  
}
