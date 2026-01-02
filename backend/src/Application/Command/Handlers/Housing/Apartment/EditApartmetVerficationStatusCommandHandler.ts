import { IReadApartmentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentRepo.repositoreis";
import { ApartmentDocumentType } from "../../../../../Domain/Shared/Enum/ApartmentDocument.enum";
import { IUnitOfWork } from "../../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { EditApartmentVerificationStatus } from "../../../Commands/Apartment/udateApartmentVerfiedSTatus.command";
import { ICommandHandlers } from "../../../ICommandHandlers";

export class EditApartmentStatusVerifiedCommandHandler
  implements ICommandHandlers<EditApartmentVerificationStatus>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly IReadApartmentRepo: IReadApartmentRepo
  ) {}

  public async handle(command: EditApartmentVerificationStatus): Promise<any> {
    try {
      const apartment = await this.IReadApartmentRepo.findApartmentById(
        command.apartmentId
      );

      if (!apartment) throw new Error("No apartment found !!");

      // CASE: Admin wants to Mark as Verified (True)
      if (command.Verified === true) {
        
        // 1. Get the documents
        const documents = apartment.getApartmentDocument();

        // 2. Safety Check: Are there any documents at all?
        if (!documents || documents.length === 0) {
          throw new Error(
            "Cannot verify: The landlord has not uploaded any documents yet."
          );
        }

        const hasVerificationDoc = documents.some(
          (doc) => doc.getApartmentType() === ApartmentDocumentType.ApartmentVerifiedFile
        );

        if (!hasVerificationDoc) {
           throw new Error(
            "Cannot verify: The uploaded document is not a Verification File."
           );
        }

        // 4. Apply Changes
        apartment.markAsVerified();
        apartment.markAsVisible();
      }

      // CASE: Admin wants to Un-verify (False)
      if (command.Verified === false) {
        apartment.markAsNotVerified();
        apartment.markAsNotVisible();
      }

      await this.uow.startTransaction();
      await this.uow.writeApartmentRepo.updateApartment(apartment);
      await this.uow.commitTransaction();
      
      return { message: "Apartment status updated successfully" };

    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("Fail to update apartment status !!", error);
      throw error; // Re-throw so the controller knows it failed
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}