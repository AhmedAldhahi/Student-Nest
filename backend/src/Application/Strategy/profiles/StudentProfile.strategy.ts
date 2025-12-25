import { UpdateStudentCommand } from "../../Command/Commands/UpdateStudentCommand";
import { UpdateStudentCommandHandler } from "../../Command/Handlers/UpdateStudentCommandHandler";
import { StudentUpdateProfileRequest } from "../../DTO/profile/StudentRequest.updateProfile.profile.dtos";
import { ICashMemoryService } from "../../Interfaces/ICash.interface";
import { GetStudentQueriesHandlers } from "../../Queries/Handlers/GetStudentProfileQueriesHandler";
import { GetUserProfileQueries } from "../../Queries/Queries/GetUserProfileQueries";
import { IProfileStrategy } from "./IprofileStrategy.strategy";

export class StudentProfileStrategy implements IProfileStrategy {
  constructor(
    private readonly QueryHandler: GetStudentQueriesHandlers,
    private readonly commandHandler: UpdateStudentCommandHandler,
    // private readonly passwordService: IPasswordService,
    // private readonly fileService: IFileStorageService,
    private readonly cashService: ICashMemoryService
  ) {}

  public async UserProfile(userId: string): Promise<any> {
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
    dto: StudentUpdateProfileRequest
  ): Promise<any> {
    try {
      const command = new UpdateStudentCommand(userId, dto);
      await this.commandHandler.handle(command);

      const cashKey = `profile : ${userId}`;
      await this.cashService.delete(cashKey);

      return {
        message: "student profile update succfully ",
      };
    } catch (error: any) {
      console.error("fail to update student profile", error);
      throw error;
    }
  }
}
