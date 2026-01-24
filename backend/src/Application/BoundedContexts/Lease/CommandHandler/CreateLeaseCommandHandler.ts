import { v4 as uuidv4 } from "uuid";
import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { LeaseAggregateRoot } from "../../../../Domain/BoundedContexts/Leases/AgregateRoot/leaseEntity.entity";
import { IReadLeaseRequestRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { CreateLeaseCommand } from "../Command/CreateLeaseCommand";
import { MonthlyRent } from "../../../../Domain/BoundedContexts/Housing/Value-Object/MonthlyRent.vo";
import { AdapterHelper } from "../../../../Shared/utils/AdapterHelper.util";
import { LeaseStartDate } from "../../../../Domain/BoundedContexts/Leases/Value-Object/LeaseStartDate.vo";
import { RentTerm } from "../../../../Domain/BoundedContexts/Leases/Value-Object/RentTerm.vo";
import { LeaseTerm } from "../../../../Domain/BoundedContexts/Leases/Value-Object/LeaseTerm.vo";
import { createLeaseResponse } from "../Dto/Response/createLeaseReponse";
import { LeaseRequestStatus } from "../../../../Domain/BoundedContexts/Leases/Enum/LeaseRequestStatus.enum";
import { IReadLeaseRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRepositories.repositories";

export class CreateLeaseCommandHandler implements ICommandHandlers<CreateLeaseCommand> {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLeaseRequestRepo: IReadLeaseRequestRepositories,
    private readonly readLeaseRepo: IReadLeaseRepositories,
    private readonly readApartmentRepo: IReadApartmentRepo,
    private readonly uow: IUnitOfWork,
  ) {}

  public async handle(
    command: CreateLeaseCommand,
  ): Promise<createLeaseResponse> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

      user.ensureAccountIsActive();

      const leaseRequest =
        await this.readLeaseRequestRepo.findLeaseRequestForApartment(
          command.leaseRequestId,
        );

      if (!leaseRequest) throw new Error("no lease Request been send !!");

      if (leaseRequest.getRequestLeaseStatus() === LeaseRequestStatus.Reject) {
        throw new Error(
          "cannot create leases for lease request that been reject ",
        );
      }

      if (leaseRequest.getRequestLeaseStatus() === LeaseRequestStatus.Pending) {
        throw new Error("can not create lease for request that still pending ");
      }

      const leaseStartData = leaseRequest.getStartDate();

      if (typeof leaseStartData === "undefined" || !leaseStartData) {
        throw new Error("lease request start date must be declare !!");
      }

      const apartment = await this.readApartmentRepo.findApartmentById(
        leaseRequest.getApartment(),
      );

      if (!apartment) throw new Error("no apartment been found !!");

      const existingLeases =
        await this.readLeaseRepo.findAllLeaseContractForStudent(
          leaseRequest.getStudent(),
          apartment.getApartmentId(),
        );

      if (existingLeases && existingLeases.length > 0) {
        const hasActiveLease = existingLeases.some(
          (lease) => !lease.checkIfLeaseExpiredLease(),
        );

        if (hasActiveLease) {
          throw new Error(
            "Cannot create lease: This student already has an active, non-expired lease for this apartment.",
          );
        }
      }

      const leaseId = uuidv4();
      const apartmentPrice = apartment.getApartmentPrice();

      if (typeof apartmentPrice === undefined || !apartmentPrice)
        throw new Error("apartment price must me declare !!");

      const startDateStr = leaseRequest.getStartDate();

      if (typeof startDateStr === "undefined" || !startDateStr) {
        throw new Error("start date must be declare ");
      }
      const rentTerms = leaseRequest.getRentTerm();
      if (typeof rentTerms === "undefined" || !rentTerms) {
        throw new Error("rent term must be declare !!");
      }

      const startDateVO = LeaseStartDate.create(startDateStr);
      const rentVO = RentTerm.create(rentTerms);
      const endDateVO = AdapterHelper.CalculateEndDate(startDateVO, rentVO);

      const lease = new LeaseAggregateRoot({
        leaseId: leaseId,
        houseRule: apartment.getHouseRule(),
        ActivationStatus: false,
        isLandlordSigned: true,
        isStudentSigned: true,
        includeUtilities: apartment.getIncludeUtilities(),

        leaseStartData: startDateVO,
        leaseEndData: endDateVO,
        leaseTerm: LeaseTerm.create(startDateVO, endDateVO),
        monthlyRent: MonthlyRent.create(apartmentPrice),

        apartmentId: apartment.getApartmentId(),
        landlordId: apartment.getLandlord(),
        studentId: leaseRequest.getStudent(),
        createAt: new Date(),
        paymentSchedule: null,
      });

      lease.generatePaymentSchedule();

      await this.uow.startTransaction();
      await this.uow.writeLeaseRepo.createLease(lease);
      await this.uow.commitTransaction();

      return {
        message: "lease created successfully ",
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error(`fail to create Lease for students !!`, error);
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
