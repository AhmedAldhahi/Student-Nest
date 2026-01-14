import { IReadStudentRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadStudentRepositories.repositories";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { StudentCard } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentCard.vo";
import { studentGraduateYear } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentGraduateYear.vo";
import { StudentMajor } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentMajor.vo";
import { StudentUniversity } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentUniversity.vo";
import { UserDateOfBirth } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserDateOfBirth.vo";
import { UserName } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserPhoneNumber.vo";
import { VerificationDocument } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/VerficationDocument.vo";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { IFileStorageService } from "../../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../../Interfaces/IPassword.interface";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { UpdateStudentCommand } from "../Command/UpdateStudentCommand";

export class UpdateStudentCommandHandler
  implements ICommandHandlers<UpdateStudentCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readStudentRepo: IReadStudentRepositories,
    private readonly fileService: IFileStorageService,
    private readonly passwordService: IPasswordService
  ) {}

  public async handle(command: UpdateStudentCommand): Promise<void> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user  found !!");

      const student = await this.readStudentRepo.findStudentById(
        command.userId
      );
      if (!student) throw new Error("no student  found !!");

      // Update fields
      if (command.address) user.setAddress(command.address);

      if (command.dateOfBirth)
        user.changeDateOfBirth(UserDateOfBirth.create(command.dateOfBirth));

      if (command.name) user.changeUserName(UserName.create(command.name));

      if (command.phoneNumber)
        user.changeUserPhoneNumber(userPhoneNumber.create(command.phoneNumber));

      if (command.photo) {
        const photo = user.getPhoto();
        if (photo) {
          let photoDoc: string = await this.fileService.update(
            command.photo,
            photo
          );
          user.setPhoto(photoDoc);
        }
        let photoDoc: string = await this.fileService.upload(command.photo);
        user.setPhoto(photoDoc);
      }

      if (command.newPassword && command.oldPassword) {
        const validatePass = await this.passwordService.compare(
          command.oldPassword,
          user.getPass()
        );

        if (!validatePass) throw new Error("old pass is not correct");
        const newPass = await this.passwordService.hash(command.newPassword);

        if (await this.passwordService.compare(newPass, user.getPass()))
          throw new Error("you use this password before");

        user.changePassword(newPass);
      }

      if (command.major) {
        student.changeMajor(StudentMajor.create(command.major));
      }

      if (command.gradateYear) {
        student.changeGraduateYear(
          studentGraduateYear.create(command.gradateYear)
        );
      }

      if (command.studentCardId) {
        student.changeStudentCardID(StudentCard.create(command.studentCardId));
      }

      if (command.universityName) {
        student.changeUniversityName(
          StudentUniversity.create(command.universityName)
        );
      }

      if (command.verificationFile) {
        let verifiedFile: string = await this.fileService.upload(
          command.verificationFile
        );

        student.updateVerificationDocument(
          VerificationDocument.create(verifiedFile)
        );
      }

      //   if (command.cliQAccount) {
      //     landlord.updateCliQAccount(command.cliQAccount);
      //   }

      // Save the updated user
      await this.uow.startTransaction();
      await this.uow.writeStudentRepo.updateStudent(student);
      await this.uow.writeUserRepo.updateUser(user);
      await this.uow.commitTransaction();

      // Return success message
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("Error updating profile:", error.message);
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
