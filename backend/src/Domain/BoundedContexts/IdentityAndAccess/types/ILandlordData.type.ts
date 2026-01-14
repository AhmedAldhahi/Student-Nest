import { GovernmentID } from "../Value-Object/UserGovId.vo";
import { VerificationDocument } from "../Value-Object/VerficationDocument.vo";

// export interface ILandlordData {
//   userId: string;
//   cliQAccount: string;
//   landlordGovId: GovernmentID;
//   document: VerificationDocument;
//   isVerifiedLandlord?: boolean;
// }

export type LandlordDataType = {
  userId: string;
  cliQAccount: string;
  landlordGovId: GovernmentID;
  document: VerificationDocument;
  isVerifiedLandlord?: boolean;
};
