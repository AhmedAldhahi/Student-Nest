import { ICashMemoryService } from "../../../../Interfaces/ICash.interface";
import { UpdateStudentCommand } from "../../../IdentityAndAccess/Command/UpdateStudentCommand";
import { UpdateStudentCommandHandler } from "../../../IdentityAndAccess/CommandHandler/UpdateStudentCommandHandler";
import { UpdateStudentProfileRequest } from "../../../IdentityAndAccess/Dto/Request/UpdateStudentProfileRequest";
import { GetStudentProfileResponse } from "../../../IdentityAndAccess/Dto/Response/GetStudentProfileResponse";
import { UpdateProfileResponse } from "../../../IdentityAndAccess/Dto/Response/UpdateProfileResponse";
import { GetUserProfileQueries } from "../../../IdentityAndAccess/Queries/GetUserProfileQueries";
import { GetStudentQueriesHandlers } from "../../../IdentityAndAccess/QueriesHandler/GetStudentProfileQueriesHandler";
import { IProfileStrategy } from "./IProfileStrategy.strategy";

export class StudentProfileStrategy implements IProfileStrategy {
  constructor(
    private readonly QueryHandler: GetStudentQueriesHandlers,
    private readonly commandHandler: UpdateStudentCommandHandler,
    private readonly cashService: ICashMemoryService
  ) {}

  public async UserProfile(userId: string): Promise<GetStudentProfileResponse> {
    const cashKey = `profile : ${userId}`;

    const cashData = await this.cashService.get<any>(cashKey);

    if (cashData) {
      return cashData;
    }

    const Queries = new GetUserProfileQueries(userId);
    const student = await this.QueryHandler.handle(Queries);

    if (!student) throw new Error("no user found !!");

    await this.cashService.set(cashKey, student, 36000);

    return student;
  }

  public async UpdateUserProfile(
    userId: string,
    dto: UpdateStudentProfileRequest
  ): Promise<UpdateProfileResponse> {
    try {
      const command = new UpdateStudentCommand(userId, dto);
      await this.commandHandler.handle(command);

      const cashKey = `profile : ${userId}`;
      await this.cashService.delete(cashKey);

      return {
        message: "student profile update successfully ",
      };
    } catch (error: any) {
      console.error("fail to update student profile", error);
      throw error;
    }
  }
}
