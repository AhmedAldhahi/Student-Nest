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
import { IEventBus } from "../../../../Domain/Shared/Event/IEventBus";
import { CreateLeaseRequestEvent } from "../../../../Domain/BoundedContexts/Leases/Event/LeaseRequestEvent.event";

export class CreateLeaseRequestCommandHandler
  implements ICommandHandlers<CreateApartmentRequestCommand>
{
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readStudentRepo: IReadStudentRepositories,
    private readonly readApartmentRepo: IReadApartmentRepo,
    private readonly uow: IUnitOfWork
  ) {}

  public async handle(
    command: CreateApartmentRequestCommand
  ): Promise<createLeaseRequestResponse> {
    try {
      const user = await this.readUserRepo.findById(command.studentId);
      if (!user) throw new Error("no user been found !!");

      user.ensureAccountIsActive();

      const student = await this.readStudentRepo.findStudentById(
        command.studentId
      );
      if (!student) throw new Error("no student been found !!");

      const landlordUser = await this.readUserRepo.findById(command.landlordId);
      if (!landlordUser) throw new Error("no landlord been found !!");

      const apartment = await this.readApartmentRepo.findApartmentById(
        command.apartmentId
      );
      if (!apartment) throw new Error("no apartment been found !!");

      const leaseRequestId = uuidv4();
      const NewLeaseRequest = new LeaseRequestEntity({
        requestLeaseId: leaseRequestId,
        requestMessage: command.requestMessage,
        startDate: LeaseStartDate.create(command.startDate),
        rentTerm: RentTerm.create(command.rentTerm),
        requestStatus: LeaseRequestStatus.Pending,
        createAt: new Date(),
        landlordId: command.landlordId,
        apartmentId: command.apartmentId,
        studentId: command.studentId,
      });

      student.createLeaseRequestForApartment(NewLeaseRequest);
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
