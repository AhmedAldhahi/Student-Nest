"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
class ProfileController {
    constructor(userProfileDataUseCase, UpdateUserProfile) {
        this.userProfileDataUseCase = userProfileDataUseCase;
        this.UpdateUserProfile = UpdateUserProfile;
        this.getProfileDetails = async (req, res) => {
            try {
                const userId = req.user?.userId;
                if (!userId)
                    throw new Error("no user id been found !!");
                console.log(userId);
                const result = await this.userProfileDataUseCase.execute(userId);
                return res.status(200).json(result);
            }
            catch (error) {
                return res
                    .status(400)
                    .json({ error: error.message || "internal server Error" });
            }
        };
        this.updateUserProfile = async (req, res) => {
            try {
                const userId = req.user?.userId;
                if (!userId)
                    throw new Error("no user id found !!");
                const files = req.files;
                const photoFile = files?.['photo']?.[0];
                const verificationDoc = files?.['verificationFile']?.[0];
                const dto = {
                    ...req.body,
                    ...(photoFile && { photo: photoFile }),
                    ...(verificationDoc && { verificationFile: verificationDoc }),
                };
                console.log("👉 DTO Prepared:", {
                    ...dto,
                    photo: photoFile?.originalname,
                    verificationFile: verificationDoc?.originalname
                });
                const result = await this.UpdateUserProfile.execute(userId, dto);
                return res.status(200).json(result);
            }
            catch (error) {
                return res
                    .status(400)
                    .json({ error: error.message || "internal server error" });
            }
        };
    }
}
exports.ProfileController = ProfileController;
