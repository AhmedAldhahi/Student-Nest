import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IReadStudentRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadStudentRepositories.repositories";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { LeaseRequestEntity } from "../../../../Domain/BoundedContexts/Leases/Entities/leaseRequestEntity.entity";
import { LeaseRequestStatus } from "../../../../Domain/BoundedContexts/Leases/Enum/LeaseRequestStatus.enum";
import { LeaseStartDate } from "../../../../Domain/BoundedContexts/Leases/Value-Object/LeaseStartDate.vo";
import { RentTerm } from "../../../../Domain/BoundedContexts/Leases/Value-Object/RentTerm.vo";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { CreateApartmentRequestCommand } from "../Command/CreateLeaseRequestCommand";
import { v4 as uuidv4 } from "uuid";
import { createLeaseRequestResponse } from "../Dto/Respone/createLeaseRequestResponse";
import { IReadLeaseRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { IReadLeaseRequestRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { AdapterHelper } from "../../../../Shared/utils/AdapterHelper.util";

export class CreateLeaseRequestCommandHandler implements ICommandHandlers<CreateApartmentRequestCommand> {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readStudentRepo: IReadStudentRepositories,
    private readonly readApartmentRepo: IReadApartmentRepo,
    private readonly readLeaseRequestRepo: IReadLeaseRequestRepositories,
    private readonly readLeaseRepo: IReadLeaseRepositories,
    private readonly uow: IUnitOfWork,
  ) {}

  public async handle(
    command: CreateApartmentRequestCommand,
  ): Promise<createLeaseRequestResponse> {
    try {
      const user = await this.readUserRepo.findById(command.studentId);
      if (!user) throw new Error("no user been found !!");

      user.ensureAccountIsActive();

      const student = await this.readStudentRepo.findStudentById(
        command.studentId,
      );

      if (!student) throw new Error("no student been found !!");

      const apartment = await this.readApartmentRepo.findApartmentById(
        command.apartmentId,
      );
      if (!apartment) throw new Error("no apartment been found !!");

      // if (
      //   apartment.getIsVisible() === false ||
      //   apartment.getIsVerified() === false
      // ) {
      //   throw new Error("no apartment been found !!");
      // }

      const landlordUser = await this.readUserRepo.findById(
        apartment.getLandlord(),
      );
      if (!landlordUser) throw new Error("no landlord been found !!");

      const leasesActiveNumber =
        await this.readLeaseRepo.countActiveLeasesByApartmentId(
          command.apartmentId,
        );

      const DigitNumberOfBed = Number(apartment.getNumberOfBed());

      if (isNaN(DigitNumberOfBed)) {
        throw new Error("number of bed is invalid or undefine !!");
      } else if (leasesActiveNumber === DigitNumberOfBed) {
        throw new Error(
          "The apartment is full. You cannot make a lease request until a lease ends.",
        );
      }

      const existingLeases =
        await this.readLeaseRepo.findAllLeaseContractForStudent(
          command.studentId,
          command.apartmentId,
        );

      if (existingLeases && existingLeases.length > 0) {
        const hasActiveLease = existingLeases.some(
          (lease) => !lease.checkIfLeaseExpiredLease(),
        );

        if (hasActiveLease) {
          throw new Error(
            "You cannot create a lease request; you already have an active lease for this apartment.",
          );
        }
      }

      const pendingRequests =
        await this.readLeaseRequestRepo.findAllLeaseRequestForStudent(
          command.studentId,
        );

      if (pendingRequests && pendingRequests.length > 0) {
        const existingPendingRequestDTO = pendingRequests.find(
          (req) =>
            req.apartmentId === command.apartmentId &&
            req.requestStatus === LeaseRequestStatus.Pending,
        );

        console.log("existingPendingRequestDTO", pendingRequests);

        if (existingPendingRequestDTO) {
          const existingRequestEntity =
            AdapterHelper.FromILeaseRequestDTOToLeaseRequestEntity(
              existingPendingRequestDTO,
            );

          const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
          const now = new Date().getTime();
          const created = new Date(
            existingRequestEntity.getCreateAt(),
          ).getTime();
          const isExpired = now - created > THREE_DAYS_IN_MS;

          if (isExpired) {
            existingRequestEntity.reject();

            await this.uow.startTransaction();
            await this.uow.writeLeaseRequestRepo.updateLeaseRequest(
              existingRequestEntity,
            );
            await this.uow.commitTransaction();
          } else {
            throw new Error(
              "You already have a pending request for this apartment. Please wait 3 days for it to expire or contact the landlord.",
            );
          }
        }
      }

      const leaseRequestId = uuidv4();
      const NewLeaseRequest = new LeaseRequestEntity({
        requestLeaseId: leaseRequestId,
        requestMessage: command.requestMessage,
        startDate: LeaseStartDate.create(command.startDate),
        rentTerm: RentTerm.create(command.rentTerm),
        requestStatus: LeaseRequestStatus.Pending,
        createAt: new Date(),
        landlordId: apartment.getLandlord(),
        apartmentId: command.apartmentId,
        studentId: command.studentId,
      });

      await this.uow.startTransaction();

      await this.uow.writeLeaseRequestRepo.createLeaseRequest(NewLeaseRequest);
      await this.uow.commitTransaction();

      //Reminder: you have to add the event to send notifications

      return {
        message: "lease request create scussfuly ",
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to create lease Requests !!", error);
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
