import { EditStatusOfPaymentCommandHandler } from "../../../Application/Command/Handlers/Payment/EditStatusOfPaymentCommandHandler";
import { GetAllPaymentScheduleForSingleLeasesQueriesHandler } from "../../../Application/Queries/Handlers/Payment/GetAllPaymentScheduleForSingleLeasesQueriesHandler";
import { GetReceiptForSinglePaymentQueriesHandler } from "../../../Application/Queries/Handlers/Payment/GetReceiptForSinglePaymentQueriesHandler";
import { EditPaymentStatusUseCase } from "../../../Application/Use-Case/Landlord/Payment/EditPaymentStatus.usecase";
import { GetAllPaymentScheduleForSingleLeaseUseCase } from "../../../Application/Use-Case/Landlord/Payment/GetPaymentSchedualForOneLease.usecase";
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

  const CH = new EditStatusOfPaymentCommandHandler(
    uow,
    readUserRepo,
    readLandlordRepo,
    readPaymentRepo,
    readLeaseRepo
  );

  return new EditPaymentStatusUseCase(CH);
}
