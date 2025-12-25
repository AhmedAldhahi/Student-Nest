import { UserRole } from "../../../Domain/Enum/UserRole.enum";
import { RegisterStudentRequest } from "../../DTO/registeration/RegisterStudentRequest.dtos";
import { ICommand } from "../ICommand";

export class CreateStudentCommand implements ICommand {
  // Required fields
  public readonly email: string;
  public readonly name: string;
  public readonly password: string;
  public readonly role: UserRole.student;
  public readonly dateOfBirth: string;
  public readonly phoneNumber: string;

  public readonly major: string;
  public readonly gradateYear: number;
  public readonly studentCardId: string;
  public readonly universityName: string;
  public readonly studentGovId: string;
  public readonly verificationFile: Express.Multer.File;


  
  // Optional fields
  public readonly address?: string;

  constructor(studentData: RegisterStudentRequest) {
    this.email = studentData.email;
    this.name = studentData.name;
    this.password = studentData.password;
    this.role = studentData.role;
    this.dateOfBirth = studentData.dateOfBirth;
    this.phoneNumber = studentData.phoneNumber;
    this.major = studentData.major;
    this.gradateYear = studentData.gradateYear;
    this.studentCardId = studentData.studentCardId;
    this.universityName = studentData.universityName;
    this.studentGovId = studentData.studentGovId;
    this.verificationFile = studentData.verificationFile;
    this.address = studentData.address;
  }
}
