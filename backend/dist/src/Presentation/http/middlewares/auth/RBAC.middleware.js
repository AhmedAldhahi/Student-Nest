"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBAC = void 0;
const zod_1 = require("zod");
const profileValidation_zod_1 = require("../../validation/profileValidation.zod");
const data_source_1 = require("../../../../Infrastructure/database/orm/TypeOrm/data-source");
const User_entity_1 = require("../../../../Infrastructure/database/orm/TypeOrm/entity/User.entity");
const RBAC = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return res.status(401).json({ error: "No user found !!" });
        const userRepo = data_source_1.AppDataSource.getInstance().getRepository(User_entity_1.UserModel);
        const user = await userRepo.findOne({ where: { userId: userId } });
        if (!user)
            return res.status(404).json({ error: "User not found !!" });
        const role = user.Role;
        let schema;
        switch (role) {
            case "admin":
                schema = profileValidation_zod_1.adminProfileSchema;
                break;
            case "student":
                schema = profileValidation_zod_1.studentProfileSchema;
                break;
            case "landloard":
                schema = profileValidation_zod_1.landlordProfileSchema;
                break;
            default:
                return res.status(403).json({ error: "Forbidden: Invalid role" });
        }
        const files = req.files;
        const photoFile = files?.["photo"]?.[0];
        const verificationDoc = files?.["verificationFile"]?.[0];
        const dataToValidate = {
            ...req.body,
            ...(photoFile && { photo: photoFile }),
            ...(verificationDoc && { verificationFiles: verificationDoc }),
        };
        await schema.parseAsync(dataToValidate);
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const unauthorized = error.issues.find((e) => e.code === "unrecognized_keys");
            if (unauthorized) {
                const keys = unauthorized.keys
                    ? unauthorized.keys.join(", ")
                    : "unknown field";
                return res.status(403).json({
                    error: "not Authorization ",
                });
            }
            return res.status(400).json({
                error: "validation error " + error.message,
            });
        }
        console.error("RBAC Middleware Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.RBAC = RBAC;
