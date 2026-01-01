import { CreateApartmentCommandHandler } from "../../../Application/Command/Handlers/Housing/Apartment/CreateApartmentCommandHandler";
import { CreateApartmentUseCase } from "../../../Application/Use-Case/Landlord/ApartmentMangement/CreateApartment.usecase";
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
