import { CreateRoommateProfileCommandHandler } from "../../../../Application/BoundedContexts/RoommateProfile/CommandHandler/CreateRoommateProfileCommandHandler";
import { Request, Response } from "express";

export class RoommateProfileControllerForStudent {
  constructor(
    private readonly roommateProfileCH: CreateRoommateProfileCommandHandler,
  ) {}

  public createRoommateProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const dto = req.body;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.roommateProfileCH.handle({
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

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error " });
    }
  };
}
