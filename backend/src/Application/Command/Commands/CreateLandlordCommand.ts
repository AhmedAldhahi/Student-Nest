import { UserRole } from "../../../Domain/Enum/UserRole.enum";
import { RegisterLandloardRequest } from "../../Dtos/registeration/RegisterLandloardRequest.dtos";
import { ICommand } from "../ICommand";

export class CreateLandlordCommand implements ICommand {
  // Required fields
  public readonly email: string;
  public readonly name: string;
  public readonly password: string;
  public readonly role: UserRole.landlord;
  public readonly dateOfBirth: string;
  public readonly phoneNumber: string;

  public readonly cliQAccount: string;
  public readonly LandloardGovId: string;
  public readonly document: Express.Multer.File;

  // Optional fields
  public readonly address?: string;

  constructor(LandlordData: RegisterLandloardRequest) {
    this.email = LandlordData.email;
    this.name = LandlordData.name;
    this.password = LandlordData.password;
    this.role = LandlordData.role;
    this.dateOfBirth = LandlordData.dateOfBirth;
    this.phoneNumber = LandlordData.phoneNumber;

    this.cliQAccount = LandlordData.cliQAccount;
    this.document = LandlordData.document;
    this.LandloardGovId = LandlordData.LandloardGovId;

    this.address = LandlordData.address;
  }
}
