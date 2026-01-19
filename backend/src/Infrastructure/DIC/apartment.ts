import { DeleteApartmentByIdForAdminCommand } from "../../Application/BoundedContexts/Adminstration/Command/DeleteApartmentByIdForAdminCommand";
import { DeleteApartmentByIdForAdminCommandHandler } from "../../Application/BoundedContexts/Adminstration/CommandHandler/DeleteApartmentByIdForAdminCommandHandler";
import { CreateApartmentCommandHandler } from "../../Application/BoundedContexts/Apartment/CommandHandler/CreateApartmentCommandHandler";
import { CreateApartmentDocumentCommandHandler } from "../../Application/BoundedContexts/Apartment/CommandHandler/CreateApartmentDocumentCommandHandler";
import { deleteApartmentByIdForLandlordCommandHandler } from "../../Application/BoundedContexts/Apartment/CommandHandler/DeleteApartmentByIdForLandlordCommandHandler";
import { UpdateApartmentDetailForLandlordCommandHandler } from "../../Application/BoundedContexts/Apartment/CommandHandler/UpdateApartmentDetailCommandHandler";
import { UpdateApartmentDocumentFileCommandHandler } from "../../Application/BoundedContexts/Apartment/CommandHandler/UpdateApartmentDocumentCommandHandler";
import { FilterSearchForApartmentQueriesHandler } from "../../Application/BoundedContexts/Apartment/QueriesHandler/FilterSearchForApartmentQueriesHandler";
import { GetAllApartmentByLandlordQueriesHandler } from "../../Application/BoundedContexts/Apartment/QueriesHandler/GetAllAartmentByLandlordQueriesHandler";
import { GetAllApartmentByQueriesForLandlordQueriesHandler } from "../../Application/BoundedContexts/Apartment/QueriesHandler/GetAllApartmentByQueriesForLandlordQueriesHandler";
import { GetAllApartmentForAdminQueriesHandler } from "../../Application/BoundedContexts/Apartment/QueriesHandler/GetAllApartmentForAdminQueriesHandler";
import { GetAllApartmentThatBeenBookedQueriesHandler } from "../../Application/BoundedContexts/Apartment/QueriesHandler/GetAllApartmentForLandlordThatbookenQueriesHandler";
import { GetAllApartmentByQueryForAdminQueriesHandler } from "../../Application/BoundedContexts/Apartment/QueriesHandler/GetAllApartmentQueriesForAdmin";
import { GetAllVisibleAndNotFullApartmentQueriesHandler } from "../../Application/BoundedContexts/Apartment/QueriesHandler/GetAllVisableAndNotFullApartmentQueriesHandler";
import { GetApartmentByIdForLandlordQueriesHandler } from "../../Application/BoundedContexts/Apartment/QueriesHandler/GetApartmentByIdForLandlordQueriesHandler";
import { GetApartmentByIdQueriesHandler } from "../../Application/BoundedContexts/Apartment/QueriesHandler/GetApartmentByIdQueriesHandler";
import { GetApartmentDocumentByIdQueriesHandler } from "../../Application/BoundedContexts/Apartment/QueriesHandler/GetApartmentDocumentById.QueriesHandler";
import { GetApartmentDocumentByIdForLandlordQueriersHandler } from "../../Application/BoundedContexts/Apartment/QueriesHandler/GetApartmentDocumentByIdForLandlordQueriesHandler";
import { GetApartmentByIdForGuestQueriesHandler } from "../../Application/BoundedContexts/Apartment/QueriesHandler/GetApartmentForGuestUserQueriesHandler";
import { GetRandomlyThreeApartmentThatIsVisibleAndNotFullQueriesHandler } from "../../Application/BoundedContexts/Apartment/QueriesHandler/GetRandomlyThreeApartmentsVisableAndNotFullQueriesHandler";
import { AdminApartmentStrategy } from "../../Application/BoundedContexts/Shared/Strategy/apartment/AdminApartment.strategy";
import { ApartmentContext } from "../../Application/BoundedContexts/Shared/Strategy/apartment/ApartmentContext";
import { GuestApartmentStrategy } from "../../Application/BoundedContexts/Shared/Strategy/apartment/GuestApartment.strategy";
import { LandlordApartmentStrategy } from "../../Application/BoundedContexts/Shared/Strategy/apartment/LandlordApartment.strategy";
import { StudentApartmentStrategy } from "../../Application/BoundedContexts/Shared/Strategy/apartment/StudentApartment.strategy";
import { ReadApartmentDocumentRepositories } from "../Repositories/Read/ReadApartmentDocumentRepositories";
import { ReadApartmentRepositories } from "../Repositories/Read/ReadApartmentRepositories";
import { ReadLandlordRepositories } from "../Repositories/Read/ReadLandlordRepositories";
import { ReadLeaseRepositories } from "../Repositories/Read/ReadLeaseRepositories";
import { ReadUserRepositories } from "../Repositories/Read/ReadUserRepositories";
import { UnitOfWork } from "../Repositories/unitOfWork.repositories";
import { CloudinaryService } from "../Services/media/CloudinaryService.service";

export function AddNewApartmentCH(): CreateApartmentCommandHandler {
  const uow = new UnitOfWork();
  const fileService = new CloudinaryService();
  const readUserRepo = new ReadUserRepositories();
  const readLandlordRepo = new ReadLandlordRepositories();

  return new CreateApartmentCommandHandler(
    uow,
    fileService,
    readUserRepo,
    readLandlordRepo,
  );
}

export function AddApartmentDocumentCH(): CreateApartmentDocumentCommandHandler {
  const uow = new UnitOfWork();
  const fileService = new CloudinaryService();
  const readUserRepo = new ReadUserRepositories();
  const readLandlordRepo = new ReadLandlordRepositories();
  const readApartmentRepo = new ReadApartmentRepositories();

  return new CreateApartmentDocumentCommandHandler(
    readUserRepo,
    readLandlordRepo,
    readApartmentRepo,
    uow,
    fileService,
  );
}

export function DeleteApartmentByIdForLandlordCH(): deleteApartmentByIdForLandlordCommandHandler {
  const uow = new UnitOfWork();
  const fileService = new CloudinaryService();
  const readApartmentRepo = new ReadApartmentRepositories();

  return new deleteApartmentByIdForLandlordCommandHandler(
    uow,
    readApartmentRepo,
    fileService,
  );
}

export function UpdateApartmentDetailCH(): UpdateApartmentDetailForLandlordCommandHandler {
  const ReadApartmentRepo = new ReadApartmentRepositories();
  const uow = new UnitOfWork();
  const fileService = new CloudinaryService();
  const readUserRepo = new ReadUserRepositories();
  const readLandlordRepo = new ReadLandlordRepositories();

  return new UpdateApartmentDetailForLandlordCommandHandler(
    uow,
    ReadApartmentRepo,
    readUserRepo,
    readLandlordRepo,
    fileService,
  );
}

export function UpdateApartmentDocumentsCH(): UpdateApartmentDocumentFileCommandHandler {
  const uow = new UnitOfWork();
  const ReadApartmentDocumentRepo = new ReadApartmentDocumentRepositories();
  const readApartmentRepo = new ReadApartmentRepositories();
  const fileService = new CloudinaryService();
  const readUserRepo = new ReadUserRepositories();
  const readLandlordRepo = new ReadLandlordRepositories();

  return new UpdateApartmentDocumentFileCommandHandler(
    fileService,
    uow,
    readApartmentRepo,
    readLandlordRepo,
    readUserRepo,
    ReadApartmentDocumentRepo,
  );
}

export function UserApartmentContext(): ApartmentContext {
  const ReadApartmentRepo = new ReadApartmentRepositories();
  const ReadUseRepo = new ReadUserRepositories();
  const ReadApartmentDocumentRepo = new ReadApartmentDocumentRepositories();
  const ReadLandlordRepo = new ReadLandlordRepositories();

  const uow = new UnitOfWork();
  const fileService = new CloudinaryService();

  const DeleteApartmentCH = new DeleteApartmentByIdForAdminCommandHandler(
    uow,
    ReadApartmentRepo,
    fileService,
  );
  const queriesHandler = new GetAllApartmentByQueryForAdminQueriesHandler(
    ReadApartmentRepo,
  );

  const GetAllApartmentQH = new GetAllApartmentForAdminQueriesHandler(
    ReadApartmentRepo,
  );

  const GetAllApartmentPrefixQH =
    new GetAllApartmentByQueriesForLandlordQueriesHandler(ReadApartmentRepo);

  const GetApartmentDocumentByIdQH = new GetApartmentDocumentByIdQueriesHandler(
    ReadApartmentDocumentRepo,
  );

  const GetApartmentDetailByIdQH = new GetApartmentByIdQueriesHandler(
    ReadApartmentRepo,
  );

  const GetAllApartmentForLandlord =
    new GetAllApartmentByLandlordQueriesHandler(ReadApartmentRepo);

  const DeleteApartmentByIdForLandlord =
    new deleteApartmentByIdForLandlordCommandHandler(
      uow,
      ReadApartmentRepo,
      fileService,
    );

  const GetApartmentByIdForLandlord =
    new GetApartmentByIdForLandlordQueriesHandler(
      ReadUseRepo,
      ReadApartmentRepo,
    );

  const GetApartmentDocumentByIdForLandlord =
    new GetApartmentDocumentByIdForLandlordQueriersHandler(
      ReadUseRepo,
      ReadLandlordRepo,
      ReadApartmentDocumentRepo,
    );

  const getGustApartmentDetailsQH = new GetApartmentByIdForGuestQueriesHandler(
    ReadApartmentRepo,
  );

  const adminStrategy = new AdminApartmentStrategy(
    DeleteApartmentCH,
    queriesHandler,
    GetAllApartmentQH,
    GetApartmentDocumentByIdQH,
    GetApartmentDetailByIdQH,
  );

  const landlordStrategy = new LandlordApartmentStrategy(
    GetAllApartmentForLandlord,
    GetAllApartmentPrefixQH,
    DeleteApartmentByIdForLandlord,
    GetApartmentByIdForLandlord,
    GetApartmentDocumentByIdForLandlord,
  );

  const studentStrategy = new StudentApartmentStrategy(
    GetApartmentDetailByIdQH,
  );

  const guestStrategy = new GuestApartmentStrategy(getGustApartmentDetailsQH);

  return new ApartmentContext(
    ReadUseRepo,
    adminStrategy,
    landlordStrategy,
    studentStrategy,
  );
}

export function GetAllBookedApartmentQH(): GetAllApartmentThatBeenBookedQueriesHandler {
  const userRepo = new ReadUserRepositories();
  const leaseRepo = new ReadLeaseRepositories();
  const ApartmentRepo = new ReadApartmentRepositories();

  return new GetAllApartmentThatBeenBookedQueriesHandler(
    userRepo,
    ApartmentRepo,
    leaseRepo,
  );
}

export function GetRandomlyThreeApartmentThatIsVisibleAndNotFullQH(): GetRandomlyThreeApartmentThatIsVisibleAndNotFullQueriesHandler {
  const readApartmentRepo = new ReadApartmentRepositories();
  const ReadLeaseRepo = new ReadLeaseRepositories();

  return new GetRandomlyThreeApartmentThatIsVisibleAndNotFullQueriesHandler(
    readApartmentRepo,
    ReadLeaseRepo,
  );
}

export function GetAllVisibleAndNotFullApartmentQH(): GetAllVisibleAndNotFullApartmentQueriesHandler {
  const readApartmentRepo = new ReadApartmentRepositories();
  const ReadLeaseRepo = new ReadLeaseRepositories();

  return new GetAllVisibleAndNotFullApartmentQueriesHandler(
    readApartmentRepo,
    ReadLeaseRepo,
  );
}

export function GetApartmentDetailForGuestQH(): GetApartmentByIdForGuestQueriesHandler {
  const readApartmentRepo = new ReadApartmentRepositories();

  return new GetApartmentByIdForGuestQueriesHandler(readApartmentRepo);
}

export function GetFilterApartmentQH(): FilterSearchForApartmentQueriesHandler {
  const readApartmentRepo = new ReadApartmentRepositories();

  return new FilterSearchForApartmentQueriesHandler(readApartmentRepo);
}
