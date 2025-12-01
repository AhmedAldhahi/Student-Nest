import { IStudentRepository } from "../../../Core/repositories/StudentRepositories.repositories";
import { IProfileStrategy } from "./IprofileStrategy.strategy";

export class StudentProfileStrategy implements IProfileStrategy {
  constructor(private studentRep: IStudentRepository) {}
  async UserProfile(userId: string): Promise<any> {
    const user = await this.studentRep.findStudentById(userId);
    if (!user) throw new Error("no user found !!");

    return {
      email: user.getUser().getEmail(),
      name: user.getUser().getName(),
      role: user.getUser().getRole(),
      dateOfBirth: user.getUser().getDateOfBirth(),
      phoneNumber: user.getUser().getPhoneNumber(),

      address: user.getUser().getAddress(),
      photo: user.getUser().getPhoto(),
      major: user.getMajor(),
      gradateYear: user.getGraduateYear(),
      studentCardId: user.getStudentCardID(),
      universityName: user.getUniversityName(),
      studentGovId: user.getGovernmentId(),
      verificationFile: user.getVerificationDocument(),
    };
  }
}
