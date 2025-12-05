"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const express_1 = require("express");
const getProfileRatelimit_middleware_1 = require("../middlewares/rate-limited/getProfileRatelimit.middleware");
const isAuth_middleware_1 = require("../middlewares/auth/isAuth.middleware");
const updateProfileRateLimit_middleware_1 = require("../middlewares/rate-limited/updateProfileRateLimit.middleware");
const multer_1 = __importDefault(require("multer"));
const RBAC_middleware_1 = require("../middlewares/auth/RBAC.middleware");
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const profileRouter = (profileController) => {
    const router = (0, express_1.Router)();
    router.get("/profile", getProfileRatelimit_middleware_1.GetProfile, isAuth_middleware_1.isAuth, profileController.getProfileDetails);
    router.patch("/profile", upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "verificationFile", maxCount: 1 },
    ]), updateProfileRateLimit_middleware_1.updateProfile, isAuth_middleware_1.isAuth, RBAC_middleware_1.RBAC, profileController.updateUserProfile);
    return router;
};
exports.profileRouter = profileRouter;
