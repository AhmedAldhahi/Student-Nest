import { EditStatusOfPaymentCommandHandler } from "../../../Application/Command/Handlers/Payment/EditStatusOfPaymentCommandHandler";
import { FindAllPaymentHistoryForLandlordQueriesHandler } from "../../../Application/Queries/Handlers/Payment/FindAllPaymentHistoryForLandlordForSingleLease";
import { GetAllPaymentScheduleForSingleLeasesQueriesHandler } from "../../../Application/Queries/Handlers/Payment/GetAllPaymentScheduleForSingleLeasesQueriesHandler";
import { GetReceiptForSinglePaymentQueriesHandler } from "../../../Application/Queries/Handlers/Payment/GetReceiptForSinglePaymentQueriesHandler";
import { LandlordPaymentStrategy } from "../../../Application/Strategy/Payment/LandlordPayment.strategy";
import { PaymentContext } from "../../../Application/Strategy/Payment/PaymentContext";
import { StudentPaymentStrategy } from "../../../Application/Strategy/Payment/StudentPayment.strategy";
import { EditPaymentStatusUseCase } from "../../../Application/Use-Case/Landlord/Payment/EditPaymentStatus.usecase";
import { GetAllPaymentScheduleForSingleLeaseUseCase } from "../../../Application/Use-Case/Landlord/Payment/GetPaymentSchedualForOneLease.usecase";
import { GetPaymentThatPaidUseCase } from "../../../Application/Use-Case/Landlord/Payment/GetPaymentThatPaid.usecase";
import { GetReceiptForOnePaymentUseCase } from "../../../Application/Use-Case/Landlord/Payment/GetReceiptForOnePayment.usecase";
import { ReadLandlordRepositories } from "../../Repositories/Read/ReadLandlordRepositories";
import { ReadLeaseRepositories } from "../../Repositories/Read/ReadLeaseRepositories";
import { ReadPaymentReceiptRepositories } from "../../Repositories/Read/ReadPaymentReceipt.Repositories";
import { ReadPaymentScheduleRepositories } from "../../Repositories/Read/ReadPaymentScheule.Repostioreis";
import { ReadUserRepositories } from "../../Repositories/Read/ReadUserRepositories";
import { UnitOfWork } from "../../Repositories/unitOfWork.repositories";

export function GetAllPaymentScheduleForSingleLeaseUC(): GetAllPaymentScheduleForSingleLeaseUseCase {
  const readUserRepo = new ReadUserRepositories();
  const readPaymentRepo = new ReadPaymentScheduleRepositories();

  const QH = new GetAllPaymentScheduleForSingleLeasesQueriesHandler(
    readUserRepo,
    readPaymentRepo
  );

  return new GetAllPaymentScheduleForSingleLeaseUseCase(QH);
}

export function GetReceiptForPaymentUC(): GetReceiptForOnePaymentUseCase {
  const readUserRepo = new ReadUserRepositories();
  const readLeaseRepo = new ReadLeaseRepositories();
  const readPaymentReceiptRepo = new ReadPaymentReceiptRepositories();

  const QH = new GetReceiptForSinglePaymentQueriesHandler(
    readUserRepo,
    readLeaseRepo,
    readPaymentReceiptRepo
  );

  return new GetReceiptForOnePaymentUseCase(QH);
}

export function EditPaymentStatusUC(): EditPaymentStatusUseCase {
  const uow = new UnitOfWork();
  const readUserRepo = new ReadUserRepositories();
  const readLandlordRepo = new ReadLandlordRepositories();
  const readLeaseRepo = new ReadLeaseRepositories();
  const readPaymentRepo = new ReadPaymentScheduleRepositories();
  const readReceiptRepo = new ReadPaymentReceiptRepositories();

  const CH = new EditStatusOfPaymentCommandHandler(
    uow,
    readUserRepo,
    readLandlordRepo,
    readPaymentRepo,
    readLeaseRepo,
    readReceiptRepo
  );

  return new EditPaymentStatusUseCase(CH);
}

export function GetAllPaidPaymentUc(): GetPaymentThatPaidUseCase {
  const readUserRepo = new ReadUserRepositories();
  const paymentRepo = new ReadPaymentScheduleRepositories();

  const GetPaidPaymentForLandlordQH =
    new FindAllPaymentHistoryForLandlordQueriesHandler(
      readUserRepo,
      paymentRepo
    );

  const LandlordStrategy = new LandlordPaymentStrategy(
    GetPaidPaymentForLandlordQH
  );
  const StudentStrategy = new StudentPaymentStrategy();

  const paymentContext = new PaymentContext(LandlordStrategy, StudentStrategy);

  return new GetPaymentThatPaidUseCase(paymentContext, readUserRepo);
}
