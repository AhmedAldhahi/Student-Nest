import { Request, Response } from "express";
// Use the path to your Use Case
import { RegisterStudentUseCase } from "../../../Application/use-case/RegisterStudentUseCase.usecase";
import { RegisterLandloardUseCase } from "../../../Application/use-case/RegisterLandloardUseCase.usecase";
import { LoginUseCase } from "../../../Application/use-case/LoginUseCase.usecase";

export class AuthController {
  constructor(
    private registerLandlordUseCase: RegisterLandloardUseCase,
    private registerStudentUseCase: RegisterStudentUseCase,
    private loginUserUseCase: LoginUseCase
  ) {}

  public registerLandloard = async (req: Request, res: Response) => {
    try {
      const dto = req.body;
      const result = await this.registerLandlordUseCase.execute(dto);
      // scussfuly
      return res.status(201).json(result);
    } catch (err: any) {
      const status = err.statusCode;
      return res.status(400).json({ err: err.message || "server error" });
    }
  };

  public registerStudent = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      // 🔍 DEBUG LOGS (Remove these after it works)
      console.log("---------------------------------------");
      console.log("📝 Body Keys:", Object.keys(req.body));
      console.log("📂 File:", req.file ? "Found" : "Undefined");
      console.log("---------------------------------------");

      // 1. ROBUST FILE EXTRACTION
      // Handles cases where file is in req.file (Singular) OR req.files (Plural/Global Middleware)
      let fileToUpload = req.file;

      if (!fileToUpload && req.files) {
        const files: any = req.files;
        // Check if array
        if (Array.isArray(files) && files.length > 0) {
          fileToUpload = files[0];
        }
        // Check if object with named keys
        else if (typeof files === "object") {
          const keys = Object.keys(files);
          if (keys.length > 0 && Array.isArray(files[keys[0]])) {
            fileToUpload = files[keys[0]][0];
          }
        }
      }

      // 2. VALIDATE FILE EXISTENCE
      if (!fileToUpload) {
        return res.status(400).json({ error: "Verification file is required" });
      }

      // 3. CONSTRUCT DTO
      // We spread ...req.body to capture 'role', 'major', 'dateOfBirth', etc.
      // We force 'verificationFile' to match the Interface and Use Case.
      const dto = {
        ...req.body,
        verificationFile: fileToUpload,
      };

      // 4. EXECUTE USE CASE
      const result = await this.registerStudentUseCase.execute(dto);

      return res.status(201).json({ result });
    } catch (error: any) {
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

  public loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const dto = req.body;
      const result = await this.loginUserUseCase.execute(dto);

      return res.status(201).json(result);
    } catch (err: any) {
      const status = err.statusCode || 400;

      return res
        .status(status)
        .json({ err: err.message || "internal server error" });
    }
  };
}
