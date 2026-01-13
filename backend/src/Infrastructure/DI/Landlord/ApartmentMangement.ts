import { AddApartmentDocumentCommandHandler } from "../../../Application/Command/Handlers/Housing/Apartment/AddApartmentDocumentCommandHandler";
import { CreateApartmentCommandHandler } from "../../../Application/Command/Handlers/Housing/Apartment/CreateApartmentCommandHandler";
import { GetAllApartmentThatBeenBookedQueriesHandler } from "../../../Application/Queries/Handlers/Housing/Apartment/GetAllApartmentForLandlordThatbookenQueriesHandler";
import { GetApartmentDocumentByIdQueriesHandler } from "../../../Application/Queries/Handlers/Housing/Apartment/GetApartmentDocumentById.QueriesHandler";
import { AddApartmentDocumentUseCase } from "../../../Application/Use-Case/Landlord/ApartmentMangement/AddApartmentDocument.usecase";
import { CreateApartmentUseCase } from "../../../Application/Use-Case/Landlord/ApartmentMangement/CreateApartment.usecase";
import { GetBookedApartmentUseCase } from "../../../Application/Use-Case/Landlord/ApartmentMangement/getBookedApartment.usecase";
import { ReadApartmentRepositories } from "../../Repositories/Read/ReadApartmentRepositories";
import { ReadLandlordRepositories } from "../../Repositories/Read/ReadLandlordRepositories";
import { ReadLeaseRepositories } from "../../Repositories/Read/ReadLeaseRepositories";
import { ReadUserRepositories } from "../../Repositories/Read/ReadUserRepositories";
import { UnitOfWork } from "../../Repositories/unitOfWork.repositories";
import { CloudinaryService } from "../../Services/media/CloudinaryService.service";

export function createApartmentUseCase(): CreateApartmentUseCase {
  // repo
  const ReadLandlordRepo = new ReadLandlordRepositories();
  const ReadUserRepo = new ReadUserRepositories();
  const uow = new UnitOfWork();
  const fileService = new CloudinaryService();

  const CreateApartmentCH = new CreateApartmentCommandHandler(
    uow,
    fileService,
    ReadUserRepo,
    ReadLandlordRepo
  );

  return new CreateApartmentUseCase(CreateApartmentCH);
}

export function addApartmentDocumentUseCase(): AddApartmentDocumentUseCase {
  const uow = new UnitOfWork();
  const readUserRepo = new ReadUserRepositories();
  const readLandlordRepo = new ReadLandlordRepositories();
  const readApartmentRepo = new ReadApartmentRepositories();
  const fileService = new CloudinaryService();

  const CH = new AddApartmentDocumentCommandHandler(
    readUserRepo,
    readLandlordRepo,
    readApartmentRepo,
    uow,
    fileService
  );

  return new AddApartmentDocumentUseCase(CH);
}

export function GetAllBookedApartment(): GetBookedApartmentUseCase {
  const userRepo = new ReadUserRepositories();
  const leaseRepo = new ReadLeaseRepositories();
  const ApartmentRepo = new ReadApartmentRepositories();

  const QH = new GetAllApartmentThatBeenBookedQueriesHandler(
    userRepo,
    ApartmentRepo,
    leaseRepo
  );

  return new GetBookedApartmentUseCase(QH);
}
