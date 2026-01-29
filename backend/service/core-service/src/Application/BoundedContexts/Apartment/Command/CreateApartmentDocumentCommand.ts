import { ICommand } from "../../Shared/abstraction/ICommand";

export class AddApartmentDocumentCommand implements ICommand {
  apartmentDocument: Express.Multer.File;
  apartmentId: string;
  userId:string
  constructor(apartmentDocument: Express.Multer.File, apartmentId: string, userId: string) {
    this.apartmentDocument = apartmentDocument;
    this.apartmentId = apartmentId;
    this.userId = userId;
  }
}
