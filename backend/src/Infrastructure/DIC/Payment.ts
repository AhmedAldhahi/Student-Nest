import { AddNewPaymentReceiptForPaymentCommandHandler } from "../../Application/BoundedContexts/Payment/CommandHandler/AddNewReceiptForPaymentCommandHandler";
import { ChangeStatusOfPaymentCommandHandler } from "../../Application/BoundedContexts/Payment/CommandHandler/ChangeStatusOfPaymentCommandHandler";
import { FindAllPaymentHistoryForLandlordQueriesHandler } from "../../Application/BoundedContexts/Payment/QueriesHandler/FindAllPaymentHistoryForLandlordForSingleLease";
import { FindAllPaymentHistoryForStudentQueriesHandler } from "../../Application/BoundedContexts/Payment/QueriesHandler/FindAllPaymentHistoryForStudentQueriesHandler";
import { GetAllPaymentScheduleForSingleLeasesQueriesHandlerForStudent } from "../../Application/BoundedContexts/Payment/QueriesHandler/GetAllPaymentScheduleForSignleLeaseForStudentQuereisHandler";
import { GetAllPaymentScheduleForSingleLeasesQueriesHandler } from "../../Application/BoundedContexts/Payment/QueriesHandler/GetAllPaymentScheduleForSingleLeasesQueriesHandler";
import { GetReceiptForSinglePaymentForStudentQueriesHandler } from "../../Application/BoundedContexts/Payment/QueriesHandler/GetReceiptForSinglePaymentforStudentQueriesHandler";
import { GetReceiptForSinglePaymentQueriesHandler } from "../../Application/BoundedContexts/Payment/QueriesHandler/GetReceiptForSinglePaymentQueriesHandler";
import { LandlordPaymentStrategy } from "../../Application/BoundedContexts/Shared/Strategy/Payment/LandlordPayment.strategy";
import { PaymentContext } from "../../Application/BoundedContexts/Shared/Strategy/Payment/PaymentContext";
import { StudentPaymentStrategy } from "../../Application/BoundedContexts/Shared/Strategy/Payment/StudentPayment.strategy";
import { ReadLandlordRepositories } from "../Repositories/Read/ReadLandlordRepositories";
import { ReadLeaseRepositories } from "../Repositories/Read/ReadLeaseRepositories";
import { ReadPaymentReceiptRepositories } from "../Repositories/Read/ReadPaymentReceipt.Repositories";
import { ReadPaymentScheduleRepositories } from "../Repositories/Read/ReadPaymentScheule.Repostioreis";
import { ReadUserRepositories } from "../Repositories/Read/ReadUserRepositories";
import { UnitOfWork } from "../Repositories/unitOfWork.repositories";
import { CloudinaryService } from "../Services/media/CloudinaryService.service";

export function ChangeStatusOfPaymentCH(): ChangeStatusOfPaymentCommandHandler {
  const uow = new UnitOfWork();
  const readUserRepo = new ReadUserRepositories();
  const readLandlordRepo = new ReadLandlordRepositories();
  const readPaymentScheduleRepo = new ReadPaymentScheduleRepositories();
  const readLeaseRepo = new ReadLeaseRepositories();
  const readReceiptRepo = new ReadPaymentReceiptRepositories();

  return new ChangeStatusOfPaymentCommandHandler(
    uow,
    readUserRepo,
    readLandlordRepo,
    readPaymentScheduleRepo,
    readLeaseRepo,
    readReceiptRepo,
  );
}

export function AddReceiptForPaymentCH(): AddNewPaymentReceiptForPaymentCommandHandler {
  const readUserRepo = new ReadUserRepositories();
  const readPaymentRepo = new ReadPaymentScheduleRepositories();
  const fileService = new CloudinaryService();
  const uow = new UnitOfWork();

  return new AddNewPaymentReceiptForPaymentCommandHandler(
    readUserRepo,
    readPaymentRepo,
    fileService,
    uow,
  );
}

export function UserPaymentContext(): PaymentContext {
  const readUserRepo = new ReadUserRepositories();
  const paymentRepo = new ReadPaymentScheduleRepositories();
  const readLeaseRepo = new ReadLeaseRepositories();
  const readReceiptRepo = new ReadPaymentReceiptRepositories();

  const GetPaidPaymentForLandlordQH =
    new FindAllPaymentHistoryForLandlordQueriesHandler(
      readUserRepo,
      paymentRepo,
    );

  const GetPaidPaymentForStudentGH =
    new FindAllPaymentHistoryForStudentQueriesHandler(
      readUserRepo,
      paymentRepo,
    );

  const GetAllPaymentScheduleForSingleLeaseForLandlord =
    new GetAllPaymentScheduleForSingleLeasesQueriesHandler(
      readUserRepo,
      paymentRepo,
    );

  const GetAllPaymentScheduleForSingleLeaseForStudent =
    new GetAllPaymentScheduleForSingleLeasesQueriesHandlerForStudent(
      readUserRepo,
      paymentRepo,
    );

  const GetReceiptForSinglePaymentForLandlord =
    new GetReceiptForSinglePaymentQueriesHandler(
      readUserRepo,
      readLeaseRepo,
      readReceiptRepo,
    );

  const GetReceiptForSinglePaymentForStudent =
    new GetReceiptForSinglePaymentForStudentQueriesHandler(
      readUserRepo,
      readLeaseRepo,
      readReceiptRepo,
    );

  const LandlordStrategy = new LandlordPaymentStrategy(
    GetPaidPaymentForLandlordQH,
    GetAllPaymentScheduleForSingleLeaseForLandlord,
    GetReceiptForSinglePaymentForLandlord,
  );

  const StudentStrategy = new StudentPaymentStrategy(
    GetPaidPaymentForStudentGH,
    GetAllPaymentScheduleForSingleLeaseForStudent,
    GetReceiptForSinglePaymentForStudent,
  );

  return new PaymentContext(readUserRepo, LandlordStrategy, StudentStrategy);
}
