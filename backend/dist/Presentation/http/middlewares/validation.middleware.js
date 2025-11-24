"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validation = (Schema) => {
    return (req, res, next) => {
        const result = Schema.safeParse(req.body);
        if (!result.success) {
            const customizeError = result.error.issues[0];
            res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: {
                    path: customizeError.path.join("."),
                    message: customizeError.message,
                },
            });
            return;
        }
        req.body = result.data;
        next();
    };
};
exports.validation = validation;
