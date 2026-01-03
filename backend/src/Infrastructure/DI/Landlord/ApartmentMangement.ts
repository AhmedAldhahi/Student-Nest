import { AddApartmentDocumentCommandHandler } from "../../../Application/Command/Handlers/Housing/Apartment/AddApartmentDocumentCommandHandler";
import { CreateApartmentCommandHandler } from "../../../Application/Command/Handlers/Housing/Apartment/CreateApartmentCommandHandler";
import { AddApartmentDocumentUseCase } from "../../../Application/Use-Case/Landlord/ApartmentMangement/AddApartmentDocument.usecase";
import { CreateApartmentUseCase } from "../../../Application/Use-Case/Landlord/ApartmentMangement/CreateApartment.usecase";
import { ReadApartmentRepositories } from "../../Repositories/Read/ReadApartmentRepositories";
import { ReadLandlordRepositories } from "../../Repositories/Read/ReadLandlordRepositories";
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
