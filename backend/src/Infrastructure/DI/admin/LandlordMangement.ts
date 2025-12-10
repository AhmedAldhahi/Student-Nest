import { GetAllLandlordUseCase } from "../../../Application/use-case/admin/LandlordMangamement/GetAllLandlords.usecase";
import { UnitOfWork } from "../../repositories/unitOfWork.repositories";

export function GetAllLandlords(): GetAllLandlordUseCase {
  const uow = new UnitOfWork();
  return new GetAllLandlordUseCase(uow);
}
