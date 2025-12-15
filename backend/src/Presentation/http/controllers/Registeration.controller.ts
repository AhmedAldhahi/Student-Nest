import { Request, Response } from "express";
// Use the path to your Use Case
import { RegisterStudentUseCase } from "../../../Application/Use-Case/Registeration/RegisterStudentUseCase.usecase";
import { RegisterLandloardUseCase } from "../../../Application/Use-Case/Registeration/RegisterLandloardUseCase.usecase";
import { LoginUseCase } from "../../../Application/Use-Case/Registeration/LoginUseCase.usecase";

export class AuthController {
  constructor(
    private registerLandlordUseCase: RegisterLandloardUseCase,
    private registerStudentUseCase: RegisterStudentUseCase
  ) //private loginUserUseCase: LoginUseCase
  {}

  public registerLandloard = async (req: Request, res: Response) => {
    try {
      let fileBeenUpload = req.file;

      if (!fileBeenUpload && req.files) {
        const files: any = req.files;
        // Check if array
        if (Array.isArray(files) && files.length > 0) {
          fileBeenUpload = files[0];
        }
        // Check if object with named keys
        else if (typeof files === "object") {
          const keys = Object.keys(files);
          if (keys.length > 0 && Array.isArray(files[keys[0]])) {
            fileBeenUpload = files[keys[0]][0];
          }
        }
      }

      //debug
      console.log(
        "file uploaded check: ",
        fileBeenUpload ? "Found" : "Not Found"
      );

      if (!fileBeenUpload) {
        return res
          .status(400)
          .json({ error: "verification document file require !!" });
      }

      const dto = {
        ...req.body,
        document: fileBeenUpload,
      };

      const result = await this.registerLandlordUseCase.execute(dto);

      return res.status(201).json(result);
    } catch (error: any) {
      console.error("Landlord Register Error:", error);
      return res.status(400).json({ error: error.message || "server error" });
    }
  };

  public registerStudent = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
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

  // public loginUser = async (req: Request, res: Response): Promise<Response> => {
  //   try {
  //     const dto = req.body;
  //     const result = await this.loginUserUseCase.execute(dto);

  //     return res.status(201).json(result);
  //   } catch (error: any) {
  //     const status = error.statusCode || 400;

  //     return res
  //       .status(status)
  //       .json({ error: error.message || "internal server error" });
  //   }
  // };
}
