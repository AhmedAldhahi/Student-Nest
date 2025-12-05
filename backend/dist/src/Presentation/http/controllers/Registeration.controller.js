"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(registerLandlordUseCase, registerStudentUseCase, loginUserUseCase) {
        this.registerLandlordUseCase = registerLandlordUseCase;
        this.registerStudentUseCase = registerStudentUseCase;
        this.loginUserUseCase = loginUserUseCase;
        this.registerLandloard = async (req, res) => {
            try {
                const dto = req.body;
                const result = await this.registerLandlordUseCase.execute(dto);
                return res.status(201).json(result);
            }
            catch (error) {
                const status = error.statusCode;
                return res.status(400).json({ error: error.message || "server error" });
            }
        };
        this.registerStudent = async (req, res) => {
            try {
                let fileToUpload = req.file;
                if (!fileToUpload && req.files) {
                    const files = req.files;
                    if (Array.isArray(files) && files.length > 0) {
                        fileToUpload = files[0];
                    }
                    else if (typeof files === "object") {
                        const keys = Object.keys(files);
                        if (keys.length > 0 && Array.isArray(files[keys[0]])) {
                            fileToUpload = files[keys[0]][0];
                        }
                    }
                }
                if (!fileToUpload) {
                    return res.status(400).json({ error: "Verification file is required" });
                }
                const dto = {
                    ...req.body,
                    verificationFile: fileToUpload,
                };
                const result = await this.registerStudentUseCase.execute(dto);
                return res.status(201).json({ result });
            }
            catch (error) {
                console.error("Controller Error:", error);
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
            catch (error) {
                const status = error.statusCode || 400;
                return res
                    .status(status)
                    .json({ error: error.message || "internal server error" });
            }
        };
    }
}
exports.AuthController = AuthController;
