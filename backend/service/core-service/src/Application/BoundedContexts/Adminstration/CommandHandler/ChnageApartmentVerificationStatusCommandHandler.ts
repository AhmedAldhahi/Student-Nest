import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { ChangeApartmentVerificationStatus } from "../Command/ChnageApartmentVerificationStatusCommand";
import { ChangeApartmentVerificationResponse } from "../Dto/Response/ChangeApartmentVerficationResponse";

export class ChangeApartmentStatusVerifiedCommandHandler
  implements ICommandHandlers<ChangeApartmentVerificationStatus>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly readApartmentRepo: IReadApartmentRepo
  ) {}

  public async handle(
    command: ChangeApartmentVerificationStatus
  ): Promise<ChangeApartmentVerificationResponse> {
    try {
      const apartment = await this.readApartmentRepo.findApartmentById(
        command.apartmentId
      );

      if (!apartment) throw new Error("No apartment found !!");

      // CASE: Admin wants to Mark as Verified (True)
      if (command.Verified === true) {
        // 1. Get the documents
        const documents = apartment.getApartmentDocument();

        if (!documents) {
          throw new Error(
            "Cannot verify: The landlord has not uploaded any documents yet"
          );
        }

        const hasVerificationDoc = documents.getApartmentType();

        if (!hasVerificationDoc) {
          throw new Error(
            "Cannot verify: The uploaded document is not a Verification File."
          );
        }

        // 4. Apply Changes
        apartment.markAsVerified();
        apartment.markAsVisible();
      }

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
