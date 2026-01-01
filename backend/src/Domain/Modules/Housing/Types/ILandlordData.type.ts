import { GovernmentID } from "../../../Shared/Value-Object/UserGovId.vo";
import { VerificationDocument } from "../../../Shared/Value-Object/VerficationDocument.vo";

export interface ILandlordData {
  userId: string;
  cliQAccount: string;
  landlordGovId: GovernmentID;
  document: VerificationDocument;
  isVerifiedLandlord?: boolean;
}