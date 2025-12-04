import { Request, Response } from "express";
import { UserProfileDataUseCase } from "../../../Application/use-case/profile/GetUserProfileData.usecase";
import { updateUserProfileDataUseCase } from "../../../Application/use-case/profile/updateUserProfileData.usecase";
export class ProfileController {
  constructor(
    private userProfileDataUseCase: UserProfileDataUseCase,
    private UpdateUserProfile: updateUserProfileDataUseCase
  ) {}

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

public updateUserProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) throw new Error("no user id found !!");

      // 1. Cast req.files correctly
      // When using upload.fields(), req.files is an object where keys are the field names
      const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

      // 2. Extract specific files by name
      // We look specifically for 'photo' and 'verificationFile' keys
      const photoFile = files?.['photo']?.[0];
      const verificationDoc = files?.['verificationFile']?.[0];

      // 3. Create the DTO
      const dto = {
        ...req.body,
        // Only add 'photo' to DTO if the user actually uploaded a photo
        ...(photoFile && { photo: photoFile }),
        
        // Only add 'verificationFile' to DTO if the user actually uploaded one
        ...(verificationDoc && { verificationFile: verificationDoc }),
      };

      console.log("👉 DTO Prepared:", { 
          ...dto, 
          photo: photoFile?.originalname, 
          verificationFile: verificationDoc?.originalname 
      });

      const result = await this.UpdateUserProfile.execute(userId, dto);

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
