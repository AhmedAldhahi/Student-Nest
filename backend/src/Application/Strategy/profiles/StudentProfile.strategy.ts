import { IStudentRepository } from "../../../Domain/Repositories/StudentRepositories.repositories";
import { StudentCard } from "../../../Domain/Value-Object/StudentCard.vo";
import { studentGraduateYear } from "../../../Domain/Value-Object/StudentGraduateYear.vo";
import { StudentMajor } from "../../../Domain/Value-Object/StudentMajor.vo";
import { StudentUniversity } from "../../../Domain/Value-Object/StudentUniversity.vo";
import { UserDateOfBirth } from "../../../Domain/Value-Object/UserDateOfBirth.vo";
import { UserName } from "../../../Domain/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../Domain/Value-Object/UserPhoneNumber.vo";
import { VerificationDocument } from "../../../Domain/Value-Object/VerficationDocument.vo";
import { UpdateStudentCommand } from "../../Command/Commands/UpdateStudentCommand";
import { UpdateStudentCommandHandler } from "../../Command/Handlers/UpdateStudentCommandHandler";
import { StudentUpdateProfileRequest } from "../../Dtos/profile/StudentRequest.updateProfile.profile.dtos";
import { ICashMemoryService } from "../../Interfaces/ICash.interface";
import { IFileStorageService } from "../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../Interfaces/IPassword.interface";
import { GetStudentQueriesHandlers } from "../../Querie/Handlers/GetStudentProfileQueriesHandler";
import { GetUserProfileQueries } from "../../Querie/Queries/GetUserProfileQueries";
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
