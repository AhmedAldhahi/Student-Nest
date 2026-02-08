import { CreateApartmentRequestCommand } from "../../../../Application/BoundedContexts/LeaseRequest/Command/CreateLeaseRequestCommand";
import { CreateLeaseRequestCommandHandler } from "../../../../Application/BoundedContexts/LeaseRequest/CommandHandler/CreateLeaseRequestCommandHandler";
import { Request, Response } from "express";
export class LeaseRequestForStudentController {
  constructor(
    private readonly createLeaseRequestCH: CreateLeaseRequestCommandHandler
  ) {}

  public createLeaseRequest = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const { apartmentId } = req.params;

      if (!apartmentId) {
        return res.status(400).json({ error: "Apartment ID is required." });
      }

      const result = await this.createLeaseRequestCH.handle({
        leaseRequestId: "0",
        requestMessage: req.body.requestMessage,
        rentTerm: req.body.rentTerm,
        startDate: req.body.startDate,
        studentId: userId,
        apartmentId: apartmentId,
        createAt: new Date(),
      });

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
