import { IReadStudentRepositories } from "../../../Domain/Repositories/Read/ReadStudentRepositories.repositories";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { StudentCard } from "../../../Domain/Value-Object/StudentCard.vo";
import { studentGraduateYear } from "../../../Domain/Value-Object/StudentGraduateYear.vo";
import { StudentMajor } from "../../../Domain/Value-Object/StudentMajor.vo";
import { StudentUniversity } from "../../../Domain/Value-Object/StudentUniversity.vo";
import { UserDateOfBirth } from "../../../Domain/Value-Object/UserDateOfBirth.vo";
import { UserName } from "../../../Domain/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../Domain/Value-Object/UserPhoneNumber.vo";
import { VerificationDocument } from "../../../Domain/Value-Object/VerficationDocument.vo";
import { IFileStorageService } from "../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../Interfaces/IPassword.interface";
import { UpdateStudentCommand } from "../Commands/UpdateStudentCommand";
import { ICommandHandlers } from "../ICommandHandlers";

export class UpdateStudentCommandHandler
  implements ICommandHandlers<UpdateStudentCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly readUserRepo: IReadStudentRepositories,
    private readonly fileService: IFileStorageService,
    private readonly passwordService: IPasswordService
  ) {}

  public async handle(command: UpdateStudentCommand): Promise<void> {
    try {
      const student = await this.readUserRepo.findStudentById(command.userId);
      if (!student) throw new Error("no user found !!");

      // Update fields
      if (command.address) student.getUser().setAddress(command.address);

      if (command.dateOfBirth)
        student
          .getUser()
          .updateDateOfBirth(new UserDateOfBirth(command.dateOfBirth));

      if (command.name)
        student.getUser().updateName(new UserName(command.name));

      if (command.phoneNumber)
        student
          .getUser()
          .updatePhoneNumber(new userPhoneNumber(command.phoneNumber));

      if (command.photo) {
        const photo = student.getUser().getPhoto();
        if (photo) {
          let photoDoc: string = await this.fileService.update(
            command.photo,
            photo
          );
          student.getUser().setPhoto(photoDoc);
        }
        let photoDoc: string = await this.fileService.upload(command.photo);
        student.getUser().setPhoto(photoDoc);
      }

      if (command.newPassword && command.oldPassword) {
        const validatePass = await this.passwordService.compare(
          command.oldPassword,
          student.getUser().getPass()
        );

        if (!validatePass) throw new Error("old pass is not correct");
        const newPass = await this.passwordService.hash(command.newPassword);

        if (
          await this.passwordService.compare(
            newPass,
            student.getUser().getPass()
          )
        )
          throw new Error("you use this password before");

        student.getUser().setPassword(newPass);
      }

      if (command.major) {
        student.updateMajor(new StudentMajor(command.major));
      }

      if (command.gradateYear) {
        student.updateGraduateYear(new studentGraduateYear(command.gradateYear));
      }

      if (command.studentCardId) {
        student.updateStudentCardID(new StudentCard(command.studentCardId));
      }

      if (command.universityName) {
        student.updateUniversityName(new StudentUniversity(command.universityName));
      }

      if (command.verificationFile) {
        let verifiedFile: string = await this.fileService.upload(
          command.verificationFile
        );

        student.updateVerificationDocument(new VerificationDocument(verifiedFile));
      }

      //   if (command.cliQAccount) {
      //     landlord.updateCliQAccount(command.cliQAccount);
      //   }

      // Save the updated user
      await this.uow.startTransaction();
      await this.uow.writeStudentRepo.updateStudent(student);
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
