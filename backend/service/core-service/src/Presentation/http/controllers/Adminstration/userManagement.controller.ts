import { Request, Response } from "express";
import { ChangeLandlordVerificationStatusCommandHandler } from "../../../../Application/BoundedContexts/Adminstration/CommandHandler/ChangeLandlordVerificationStatusCommandHandler";
import { DeleteUserCommandHandler } from "../../../../Application/BoundedContexts/Adminstration/CommandHandler/DeleteUserCommand";
import { ChangeUserActivateStatusCommandHandler } from "../../../../Application/BoundedContexts/Adminstration/CommandHandler/ChangeUserActivateStatus.CommandHandler";
import { GetUserQueriesSimpleFactory } from "../../../../Application/BoundedContexts/Shared/SimpleFactory/GetUserQuerySimpleFactory";
import { UserSimpleFactory } from "../../../../Application/BoundedContexts/Shared/SimpleFactory/GetUsersSimpleFactory";
import { UserRole } from "../../../../Domain/Shared/Enum/UserRole.enum";

export class UserManagementController {
  constructor(
    private readonly updateLandlordVerificationStatus: ChangeLandlordVerificationStatusCommandHandler,
    private readonly deleteLandlord: DeleteUserCommandHandler,
    private readonly updateUserActivateUseCase: ChangeUserActivateStatusCommandHandler,
    private readonly GetAllUsersFactory: UserSimpleFactory,
    private readonly SearchUserFactory: GetUserQueriesSimpleFactory
  ) {}

  public updateLandlordVerifiedStatus = async (req: Request, res: Response) => {
    try {
      const { landlordId } = req.params;

      const { Verified } = req.body;
      const userId = req.user?.userId;


      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.updateLandlordVerificationStatus.handle({
        userId: landlordId,
        Verified: Verified,
      });

      return res.status(201).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public deleteLandlordById = async (req: Request, res: Response) => {
    try {
      const userid = req.user?.userId;
      const { userId } = req.params;

      if (!userid)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.deleteLandlord.handle({ userId: userId });
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public updateActivateStatus = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const dto = req.body;
      const { id } = req.params;
      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.updateUserActivateUseCase.handle({
        id: id,
        data: dto,
      });
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const { userRole } = req.params;

      const result = await this.GetAllUsersFactory.getUsers(
        userId,
        userRole as UserRole
      );

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public findUsersByQuery = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const query = (req.query.q as string) || "";
      const { userRole } = req.params;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.SearchUserFactory.getUsers(
        userId,
        userRole as UserRole,
        query
      );

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
