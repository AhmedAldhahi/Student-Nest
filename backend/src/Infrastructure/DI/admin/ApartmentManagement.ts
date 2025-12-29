import { deleteApartmentByIdCommandHandler } from "../../../Application/Command/Handlers/DeleteApartmentByIdCommandHandler";
import { EditApartmentDetailByIdCommandHandler } from "../../../Application/Command/Handlers/EditApartmentDetailByIdCommandHandler";
import { EditApartmentStatusVerifiedCommandHandler } from "../../../Application/Command/Handlers/EditApartmetVerficationStatusCommandHandler";
import { UpdateApartmentDocumentFileCommandHandler } from "../../../Application/Command/Handlers/updateApartmentDocumentCommandHandler";
import { GetAllApartmentByQueryQueriesHandler } from "../../../Application/Queries/Handlers/GetAllApartmentQueries.QueriesHandler";
import { GetAllApartmentQueriesHandler } from "../../../Application/Queries/Handlers/GetAllApartmentQueriesHandler";
import { GetApartmentByIdQueriesHandler } from "../../../Application/Queries/Handlers/GetApartmentByIdQueriesHandler";
import { GetApartmentDocumentByIdQueriesHandler } from "../../../Application/Queries/Handlers/GetApartmentDocumentById.QueriesHandler";
import { AdminApartmentStrategy } from "../../../Application/Strategy/apartment/AdminApartment.strategy";
import { ApartmentContext } from "../../../Application/Strategy/apartment/ApartmentContext";
import { LandlordApartmentStrategy } from "../../../Application/Strategy/apartment/LandlordApartment.strategy";
import { DeleteApartmentByIdUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/DeleteApartment.usecase";
import { EditApartmentDetailUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/EditApartmentDetail.usecase";
import { EditApartmentStatusVerifiedUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/EditApartmentStatus.usecase";
import { findAllApartmentUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/FindAllApartment.usecase";
import { FindAllApartmentByQueryUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/findAllApartmentByQueries.usecase";
import { findApartmentByIdUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/FindApartmentDetailsById.usecase";
import { findApartmentDocumentByIdUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/FindApartmentDocument.usecase";
import { UpdateApartmentDocumentUseCase } from "../../../Application/Use-Case/admin/ApartmentMangament/updateApartmentDocument.usecase";
import { ReadApartmentDocumentRepositories } from "../../Repositories/Read/ReadApartmentDocumentRepositories";
import { ReadApartmentRepositories } from "../../Repositories/Read/ReadApartmentRepositories";
import { ReadUserRepositories } from "../../Repositories/Read/ReadUserRepositories";
import { UnitOfWork } from "../../Repositories/unitOfWork.repositories";
import { CloudinaryService } from "../../Services/media/CloudinaryService.service";

export function GetAllApartment(): findAllApartmentUseCase {
  const ReadApartmentRepo = new ReadApartmentRepositories();
  const ReadUseRepo = new ReadUserRepositories();
  const ReadApartmentDocumentRepo = new ReadApartmentDocumentRepositories();

  const uow = new UnitOfWork();
  const fileService = new CloudinaryService();

  const DeleteApartmentCH = new deleteApartmentByIdCommandHandler(
    uow,
    ReadApartmentRepo,
    fileService
  );
  const queriesHandler = new GetAllApartmentByQueryQueriesHandler(
    ReadApartmentRepo
  );

  const GetAllApartmentQH = new GetAllApartmentQueriesHandler(
    ReadApartmentRepo
  );

  const GetApartmentDocumentByIdQH = new GetApartmentDocumentByIdQueriesHandler(
    ReadApartmentDocumentRepo
  );

  const GetApartmentDetailByIdQH = new GetApartmentByIdQueriesHandler(
    ReadApartmentRepo
  );

  const adminStrategy = new AdminApartmentStrategy(
    DeleteApartmentCH,
    queriesHandler,
    GetAllApartmentQH,
    GetApartmentDocumentByIdQH,
    GetApartmentDetailByIdQH
  );
  const landlordStrategy = new LandlordApartmentStrategy();

  const apartmentContext = new ApartmentContext(
    adminStrategy,
    landlordStrategy
  );
  return new findAllApartmentUseCase(apartmentContext, ReadUseRepo);
}

export function GetApartmentByQueries(): FindAllApartmentByQueryUseCase {
  const ReadApartmentRepo = new ReadApartmentRepositories();
  const ReadUseRepo = new ReadUserRepositories();
  const ReadApartmentDocumentRepo = new ReadApartmentDocumentRepositories();

  const uow = new UnitOfWork();
  const fileService = new CloudinaryService();

  const DeleteApartmentCH = new deleteApartmentByIdCommandHandler(
    uow,
    ReadApartmentRepo,
    fileService
  );
  const queriesHandler = new GetAllApartmentByQueryQueriesHandler(
    ReadApartmentRepo
  );

  const GetAllApartmentQH = new GetAllApartmentQueriesHandler(
    ReadApartmentRepo
  );

  const GetApartmentDocumentByIdQH = new GetApartmentDocumentByIdQueriesHandler(
    ReadApartmentDocumentRepo
  );

  const GetApartmentDetailByIdQH = new GetApartmentByIdQueriesHandler(
    ReadApartmentRepo
  );

  const adminStrategy = new AdminApartmentStrategy(
    DeleteApartmentCH,
    queriesHandler,
    GetAllApartmentQH,
    GetApartmentDocumentByIdQH,
    GetApartmentDetailByIdQH
  );
  const landlordStrategy = new LandlordApartmentStrategy();

  const apartmentContext = new ApartmentContext(
    adminStrategy,
    landlordStrategy
  );
  return new FindAllApartmentByQueryUseCase(apartmentContext, ReadUseRepo);
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
  const readUserRepositories = new ReadUserRepositories();
  const ReadApartmentDocumentRepo = new ReadApartmentDocumentRepositories();

  const commandHandler = new deleteApartmentByIdCommandHandler(
    uow,
    ReadApartmentRepo,
    fileService
  );

  const queriesHandler = new GetAllApartmentByQueryQueriesHandler(
    ReadApartmentRepo
  );

  const GetAllApartmentQH = new GetAllApartmentQueriesHandler(
    ReadApartmentRepo
  );

  const GetApartmentDocumentByIdQH = new GetApartmentDocumentByIdQueriesHandler(
    ReadApartmentDocumentRepo
  );

  const GetApartmentDetailByIdQH = new GetApartmentByIdQueriesHandler(
    ReadApartmentRepo
  );

  const adminDeleteApartmentStrategy = new AdminApartmentStrategy(
    commandHandler,
    queriesHandler,
    GetAllApartmentQH,
    GetApartmentDocumentByIdQH,
    GetApartmentDetailByIdQH
  );

  const landlordDeleteApartmentStrategy = new LandlordApartmentStrategy();

  const apartmentContext = new ApartmentContext(
    adminDeleteApartmentStrategy,
    landlordDeleteApartmentStrategy
  );

  return new DeleteApartmentByIdUseCase(apartmentContext, readUserRepositories);
}

export function FindApartmentDocumentByIdUseCase(): findApartmentDocumentByIdUseCase {
  const fileService = new CloudinaryService();
  const uow = new UnitOfWork();

  const ReadApartmentRepo = new ReadApartmentRepositories();
  const readUserRepositories = new ReadUserRepositories();
  const ReadApartmentDocumentRepo = new ReadApartmentDocumentRepositories();

  const commandHandler = new deleteApartmentByIdCommandHandler(
    uow,
    ReadApartmentRepo,
    fileService
  );

  const queriesHandler = new GetAllApartmentByQueryQueriesHandler(
    ReadApartmentRepo
  );

  const GetAllApartmentQH = new GetAllApartmentQueriesHandler(
    ReadApartmentRepo
  );

  const GetApartmentDocumentByIdQH = new GetApartmentDocumentByIdQueriesHandler(
    ReadApartmentDocumentRepo
  );

  const GetApartmentDetailByIdQH = new GetApartmentByIdQueriesHandler(
    ReadApartmentRepo
  );

  const adminDeleteApartmentStrategy = new AdminApartmentStrategy(
    commandHandler,
    queriesHandler,
    GetAllApartmentQH,
    GetApartmentDocumentByIdQH,
    GetApartmentDetailByIdQH
  );

  const landlordDeleteApartmentStrategy = new LandlordApartmentStrategy();

  const apartmentContext = new ApartmentContext(
    adminDeleteApartmentStrategy,
    landlordDeleteApartmentStrategy
  );
  return new findApartmentDocumentByIdUseCase(
    apartmentContext,
    readUserRepositories
  );
}

export function FindApartmentDetailByIdUseCase(): findApartmentByIdUseCase {
  const fileService = new CloudinaryService();
  const uow = new UnitOfWork();

  const ReadApartmentRepo = new ReadApartmentRepositories();
  const readUserRepositories = new ReadUserRepositories();
  const ReadApartmentDocumentRepo = new ReadApartmentDocumentRepositories();

  const commandHandler = new deleteApartmentByIdCommandHandler(
    uow,
    ReadApartmentRepo,
    fileService
  );

  const queriesHandler = new GetAllApartmentByQueryQueriesHandler(
    ReadApartmentRepo
  );

  const GetAllApartmentQH = new GetAllApartmentQueriesHandler(
    ReadApartmentRepo
  );

  const GetApartmentDocumentByIdQH = new GetApartmentDocumentByIdQueriesHandler(
    ReadApartmentDocumentRepo
  );

  const GetApartmentDetailByIdQH = new GetApartmentByIdQueriesHandler(
    ReadApartmentRepo
  );

  const adminDeleteApartmentStrategy = new AdminApartmentStrategy(
    commandHandler,
    queriesHandler,
    GetAllApartmentQH,
    GetApartmentDocumentByIdQH,
    GetApartmentDetailByIdQH
  );

  const landlordDeleteApartmentStrategy = new LandlordApartmentStrategy();

  const apartmentContext = new ApartmentContext(
    adminDeleteApartmentStrategy,
    landlordDeleteApartmentStrategy
  );

  return new findApartmentByIdUseCase(apartmentContext, readUserRepositories);
}

export function editApartmentDetailUseCase(): EditApartmentDetailUseCase {
  const ReadApartmentRepo = new ReadApartmentRepositories();
  const uow = new UnitOfWork();
  const fileService = new CloudinaryService();

  const commandHandler = new EditApartmentDetailByIdCommandHandler(
    ReadApartmentRepo,
    uow,
    fileService
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
