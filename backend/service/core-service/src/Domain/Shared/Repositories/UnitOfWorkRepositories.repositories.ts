import { IWriteUserRepositories } from "../../BoundedContexts/IdentityAndAccess/Repositories/WriteUserRepositories.repositories";
import { IWriteStudentRepositories } from "../../BoundedContexts/IdentityAndAccess/Repositories/WriteStudentRepositories.repositories";
import { IWriteNotificationRepo } from "../../BoundedContexts/Notifications/Repositories/IWriteNotficationRepositories.repositores";
import { IWriteApartmentRepo } from "../../BoundedContexts/Housing/Repositories/IWriteApartmentRepositories.repositories";
import { IWriteApartmentDocumentRepo } from "../../BoundedContexts/Housing/Repositories/IWriteApartmentDocumentRepositoires.repositories";
import { IWriteAuditLogRepositories } from "../../BoundedContexts/adminstration/Repositories/IWriteAuditLogRepo.repositories";
import { IWriteLandlordRepositories } from "../../BoundedContexts/IdentityAndAccess/Repositories/WriteLandlordRepositories.repositories";
import { IWriteLeaseRequestRepo } from "../../BoundedContexts/Leases/Repositories/Write/WriteLeaseRequestRepositories.repostitores";
import { IWritePaymentScheduleRepo } from "../../BoundedContexts/Payment/Repositories/WritePaymentSchedualRepositories";
import { IWriteReceiptRepo } from "../../BoundedContexts/Payment/Repositories/writeReceiptRepo.Repositories";
import { IWriteDomainEventRepo } from "./IWriteDomainEventRepo.repositories";
import { IWriteRoommateProfile } from "../../BoundedContexts/RommateProfile/Repositories/WriteRommateProfile.reposotries";
import { IWriteLeaseRepo } from "../../BoundedContexts/Leases/Repositories/Write/WriteLeaseRepositories.repositories";

export interface IUnitOfWork {
  // cqrs
  writeUserRepo: IWriteUserRepositories;
  writeStudentRepo: IWriteStudentRepositories;
  writeLandlordRepo: IWriteLandlordRepositories;
  writeNotificationRepo: IWriteNotificationRepo;
  writeApartmentRepo: IWriteApartmentRepo;
  writeApartmentDocumentRepo: IWriteApartmentDocumentRepo;
  writeAuditLogRepo: IWriteAuditLogRepositories;
  writeLeaseRequestRepo: IWriteLeaseRequestRepo;
  writePaymentScheduleRepo: IWritePaymentScheduleRepo;
  writePaymentReceiptRepo: IWriteReceiptRepo;
  writeRoommateProfileRepo: IWriteRoommateProfile;
  writeLeaseRepo: IWriteLeaseRepo;

  writeDomainEventRepo: IWriteDomainEventRepo;

  startTransaction(): Promise<void>;

  commitTransaction(): Promise<void>;

  rollbackTransaction(): Promise<void>;

  releaseTransaction(): Promise<void>;
}
