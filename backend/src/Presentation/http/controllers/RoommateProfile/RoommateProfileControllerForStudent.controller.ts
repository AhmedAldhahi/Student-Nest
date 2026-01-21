import { CreateRoommateProfileCommandHandler } from "../../../../Application/BoundedContexts/RoommateProfile/CommandHandler/CreateRoommateProfileCommandHandler";
import { Request, Response } from "express";
import { UpdateRoommateProfileCommandHandler } from "../../../../Application/BoundedContexts/RoommateProfile/CommandHandler/UpdateRoommateProfileCommandHandler";
import { GetRoommateProfileQueriesHandler } from "../../../../Application/BoundedContexts/RoommateProfile/QueriesHandler/GetRoommateProfileQueriesHandler";
import { GetRoommateProfileThatMatched } from "../../../../Application/BoundedContexts/RoommateProfile/QueriesHandler/GetRoommatedProfileThatMatchedQueriesHandler";

export class RoommateProfileControllerForStudent {
  constructor(
    private readonly createRoommateProfileCH: CreateRoommateProfileCommandHandler,
    private readonly updateRoommateProfileCH: UpdateRoommateProfileCommandHandler,
    private readonly getRoommateProfileQH: GetRoommateProfileQueriesHandler,
    private readonly getRoommateProfileThatMatchQH: GetRoommateProfileThatMatched,
  ) {}

  public createRoommateProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const dto = req.body;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.createRoommateProfileCH.handle({
        userId: userId,
        Language: dto.Language,
        bio: dto.bio,
        UserAcceptNoiseTolerance: dto.UserAcceptNoiseTolerance,
        UserSleepSchedule: dto.UserSleepSchedule,
        minAge: dto.minAge,
        maxAge: dto.maxAge,
        lifeHabit: dto.lifeHabit,
        createAt: new Date(),

        guestPolicyType: dto.guestPolicyType,
        petType: dto.petType,
        FoodPreferenceType: dto.FoodPreferenceType,
        petPreferenceType: dto.petPreferenceType,
        SharingLevelType: dto.SharingLevelType,
        SmokoHabitType: dto.SmokoHabitType,
      });

      return res.status(201).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error " });
    }
  };

  public updateRoommateProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const dto = req.body;

      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result = await this.updateRoommateProfileCH.handle({
        userId: userId,
        Language: dto.Language,
        bio: dto.bio,
        UserAcceptNoiseTolerance: dto.UserAcceptNoiseTolerance,
        UserSleepSchedule: dto.UserSleepSchedule,
        minAge: dto.minAge,
        maxAge: dto.maxAge,
        lifeHabit: dto.lifeHabit,
        guestPolicyType: dto.guestPolicyType,
        petType: dto.petType,
        FoodPreferenceType: dto.FoodPreferenceType,
        petPreferenceType: dto.petPreferenceType,
        SharingLevelType: dto.SharingLevelType,
        SmokoHabitType: dto.SmokoHabitType,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public getRoommateProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId)
        return res.status(401).json({ error: "no user id been found !!" });

      const result = await this.getRoommateProfileQH.handle({ userId: userId });

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public getRoommateProfileThatMatch = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId)
        return res.status(400).json({ error: "no user id been found !!" });

      const result = await this.getRoommateProfileThatMatchQH.handle({
        userId: userId,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
