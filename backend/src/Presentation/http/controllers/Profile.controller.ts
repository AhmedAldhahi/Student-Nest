import { Request, Response } from "express";
import { UserProfileDataUseCase } from "../../../Application/use-case/profile/GetUserProfileData.usecase";

export class ProfileController {
  constructor(private userProfileDataUseCase: UserProfileDataUseCase) {}

  public getProfileDetails = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) throw new Error("no user id been found !!");
      
      const result = await this.userProfileDataUseCase.execute(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server Error" });
    }
  };
}
