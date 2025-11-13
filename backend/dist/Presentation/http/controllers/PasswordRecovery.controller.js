"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRecoverController = void 0;
class PasswordRecoverController {
    constructor(forgetPassword) {
        this.forgetPassword = forgetPassword;
        this.changeForgetPassword = async (req, res) => {
            try {
                const dto = req.body;
                const result = await this.forgetPassword.execute(dto);
                return res.status(200).json(result);
            }
            catch (err) {
                console.log("failed to update forgetting password !!");
                const status = err.statusCode || 400;
                return res
                    .status(status)
                    .json({ message: err.message || "failed password change" });
            }
        };
    }
}
exports.PasswordRecoverController = PasswordRecoverController;
