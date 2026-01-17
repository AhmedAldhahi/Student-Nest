import { ICommand } from "../../Shared/abstraction/ICommand";
import { AddLeaseRequest } from "../Dto/Request/AddLeaseRequestsForStudentRequest";

export class CreateApartmentRequestCommand implements ICommand {
  public leaseRequestId: string;
  public requestMessage: string;
  public startDate: string;
  public rentTerm: string;
  public createAt: Date;
  public studentId: string;
  public landlordId: string;
  public apartmentId: string;

  constructor(data: AddLeaseRequest) {
    this.leaseRequestId = data.requestLeaseId;
    this.requestMessage = data.requestMessage;
    this.startDate = data.startDate;
    this.rentTerm = data.rentTerm;
    this.studentId = data.studentId;
    this.landlordId = data.landlordId;
    this.apartmentId = data.apartmentId;
  }
}
