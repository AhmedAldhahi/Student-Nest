import { IReadStudentRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadStudentRepositories.repositories";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { UpdateWhatsappPhoneNumberCommand } from "../Command/UpdateVisableForWhatsappCommand";
import { UpdateWhatsappPhoneNumberResponse } from "../Dto/Response/UpdateWhatsappStatusResponse";

export class UpdateWhatsappVisibleCommandHandler implements ICommandHandlers<UpdateWhatsappPhoneNumberCommand> {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readStudentRepo: IReadStudentRepositories,
    private readonly uow: IUnitOfWork,
  ) {}

  public async handle(
    command: UpdateWhatsappPhoneNumberCommand,
  ): Promise<UpdateWhatsappPhoneNumberResponse> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

      const student = await this.readStudentRepo.findStudentById(
        command.userId,
      );
      if (!student) throw new Error("no student been found !!");

      user.ensureAccountIsActive();
      if (command.whatsappStatus === true) {
        student.markAsVisibleForWhatsapp();
      }

      if (command.whatsappStatus === false) {
        student.markAsNotVisibleForWhatsapp();
      }

      await this.uow.startTransaction();
      await this.uow.writeStudentRepo.updateStudent(student);
      await this.uow.commitTransaction();
      
      return {
        message: "whatsapp status updated scussfuly",
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to update whatsapp status", error);
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
