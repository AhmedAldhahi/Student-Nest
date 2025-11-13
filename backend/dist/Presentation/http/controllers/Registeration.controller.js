"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(registerStudentUseCase, registerLandlordUseCase, loginUserUseCase) {
        this.registerStudentUseCase = registerStudentUseCase;
        this.registerLandlordUseCase = registerLandlordUseCase;
        this.loginUserUseCase = loginUserUseCase;
        this.registerLandloard = async (req, res) => {
            try {
                const dto = req.body;
                const result = await this.registerLandlordUseCase.execute(dto);
                return res.status(201).json(result);
            }
            catch (err) {
                const status = err.statusCode;
                return res.status(status).json({ err: err.message || "server error" });
            }
        };
        this.registerStudent = async (req, res) => {
            try {
                const dto = req.body;
                const result = await this.registerStudentUseCase.execute(dto);
                return res.status(201).json(result);
            }
            catch (error) {
                if (error.message === "Email already taken.") {
                    return res.status(409).json({ message: error.message });
                }
                const status = error.statusCode || 400;
                return res
                    .status(status)
                    .json({ error: error.message || "Server error" });
            }
        };
        this.loginUser = async (req, res) => {
            try {
                const dto = req.body;
                const result = await this.loginUserUseCase.execute(dto);
                return res.status(201).json(result);
            }
            catch (err) {
                const status = err.statusCode || 400;
                return res
                    .status(status)
                    .json({ err: err.message || "internal server error" });
            }
        };
    }
}
exports.AuthController = AuthController;
