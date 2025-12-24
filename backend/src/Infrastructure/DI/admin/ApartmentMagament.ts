import { deleteApartmentByIdCommandHandler } from "../../../Application/Command/Handlers/DeleteApartmentByIdCommandHandler";
import { EditApartmentDetailByIdCommandHandler } from "../../../Application/Command/Handlers/EditApartmentDetailByIdCommandHandler";
import { EditApartmentStatusVerifiedCommandHandler } from "../../../Application/Command/Handlers/EditApartmetVerficationStatusCommandHandler";
import { UpdateApartmentDocumentFileCommandHandler } from "../../../Application/Command/Handlers/updateApartmentDocumentCommandHandler";
import { GetAllApartmentByTitleQueriesHandler } from "../../../Application/Querie/Handlers/GetAllApartmentByName.QueriesHandler";
import { GetAllApartmentQueriesHandler } from "../../../Application/Querie/Handlers/GetAllApartmentQueriesHandler";
import { GetApartmentByIdQueriesHandler } from "../../../Application/Querie/Handlers/GetApartmentByIdQueriesHandler";
import { GetApartmentDocumentByIdQueriesHandler } from "../../../Application/Querie/Handlers/GetApartmentDocumentById.QueriesHandler";
import { DeleteApartmentByIdUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/DeleteApartment.usecase";
import { EditApartmentDetailUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/EditApartmentDetail.usecase";
import { EditApartmentStatusVerifiedUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/EditApartmentStatus.usecase";
import { findAllApartmentUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/FindAllApartment.usecase";
import { FindAllApartmentByTitleUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/findAllApartmentByName.usecase";
import { findApartmentByIdUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/FindApartmentDetailsById.usecase";
import { findApartmentDocumentByIdUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/FindApartmentDocument.usecase";
import { UpdateApartmentDocumentUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/updateApartmentDocument.usecase";
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

export function GetApartmentByTitle(): FindAllApartmentByTitleUseCase {
  const ReadApartmentRepo = new ReadApartmentRepositories();
  const queriesHandler = new GetAllApartmentByTitleQueriesHandler(
    ReadApartmentRepo
  );

  return new FindAllApartmentByTitleUseCase(queriesHandler);
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

export function editApartmentDetailUseCase(): EditApartmentDetailUseCase {
  const ReadApartmentRepo = new ReadApartmentRepositories();
  const uow = new UnitOfWork();

  const commandHandler = new EditApartmentDetailByIdCommandHandler(
    ReadApartmentRepo,
    uow
  );

  return new EditApartmentDetailUseCase(commandHandler);
}

export function EditApartmentDocumentsUseCase(): UpdateApartmentDocumentUseCase {
  const uow = new UnitOfWork();
  const ReadApartmentDocumentRepo = new ReadApartmentDocumentRepositories();
  const commandHandler = new UpdateApartmentDocumentFileCommandHandler(
    uow,
    ReadApartmentDocumentRepo
  );

  return new UpdateApartmentDocumentUseCase(commandHandler);
}
