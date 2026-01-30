import { IReadLandlordRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadLandlordRepositories.repositoreies";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRequestRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { ChangeLeaseRequestCommand } from "../Command/ChangeLeaseRequestCommand";
import { leaseRequestResponse } from "../Dto/Respone/ChangeLeaseRequestResponse";

export class updateLeaseRequestCommandHandler implements ICommandHandlers<ChangeLeaseRequestCommand> {
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLandlordRepo: IReadLandlordRepositories,
    private readonly readLeaseRequestRepo: IReadLeaseRequestRepositories,
  ) {}

  public async handle(
    command: ChangeLeaseRequestCommand,
  ): Promise<leaseRequestResponse> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

      user.ensureAccountIsActive();

      const landlord = await this.readLandlordRepo.findLandlordById(
        command.userId,
      );
      if (!landlord) throw new Error("no landlord been found !!");

      const leaseRequest =
        await this.readLeaseRequestRepo.findLeaseRequestByIdForLandlord(
          command.userId,
          command.id,
        );

      if (!leaseRequest) throw new Error("no least request been found !!");

      leaseRequest.updateLeaseRequestStatus(command.status);

      await this.uow.startTransaction();

      await this.uow.writeLeaseRequestRepo.updateLeaseRequest(leaseRequest);
      await this.uow.commitTransaction();

      return {
        message: "lease request been updated !!",
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
