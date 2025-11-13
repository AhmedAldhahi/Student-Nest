"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validation = (Schema) => {
    return (req, res, next) => {
        const result = Schema.safeParse(req.body);
        if (!result.success) {
            const customizeError = result.error.issues.map((err) => ({
                path: err.path.join('.'),
                message: err.message,
            }));
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: customizeError,
            });
            return;
        }
        req.body = result.data;
        next();
    };
};
exports.validation = validation;
