import { Router } from "express";
import { ProfileController } from "../controllers/Profile.controller";
import {GetProfile} from "../middlewares/rate-limited/getProfileRatelimit.middleware"
import { isAuth } from "../middlewares/auth/isAuth.middleware";

export const profileRouter = (profileController: ProfileController) : Router => {
    const router = Router();

    router.get('/profile',GetProfile, isAuth, profileController.getProfileDetails)



    return router;
}