import { Request, Response } from "express";
import { ProfileContext } from "../../../../Application/BoundedContexts/Shared/Strategy/profile/profilecontext";
export class ProfileController {
  constructor(private readonly userProfileContext: ProfileContext) {}

  public getProfileDetails = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) throw new Error("no user id been found !!");


      const result = await this.userProfileContext.executeStrategy(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server Error" });
    }
  };

  public updateUserProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) throw new Error("no user id found !!");

      const files = req.files as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;

      const photoFile = files?.["photo"]?.[0];
      const verificationDoc = files?.["verificationFile"]?.[0];

      const dto = {
        ...req.body,
        ...(photoFile && { photo: photoFile }),

        ...(verificationDoc && { verificationFile: verificationDoc }),
      };


      const result = await this.userProfileContext.executeUpdateStrategy(
        userId,
        dto
      );

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
