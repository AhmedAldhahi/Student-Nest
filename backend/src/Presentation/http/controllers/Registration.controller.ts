import { Request, Response } from "express";
// Use the path to your Use Case
import { RegisterStudentUseCase } from "../../../Application/Use-Case/Registeration/RegisterStudentUseCase.usecase";
import { RegisterLandloardUseCase } from "../../../Application/Use-Case/Registeration/RegisterLandloardUseCase.usecase";
import { LoginUseCase } from "../../../Application/Use-Case/Registeration/LoginUseCase.usecase";
import { AuditLogActionType } from "../../../Domain/Enum/AuditLogAction.enum";
import { ReadUserRepositories } from "../../../Infrastructure/Repositories/Read/ReadUserRepositories";

export class AuthController {
  constructor(
    private registerLandlordUseCase: RegisterLandloardUseCase,
    private registerStudentUseCase: RegisterStudentUseCase,
    private loginUserUseCase: LoginUseCase
  ) {}

  public registerLandlord = async (req: Request, res: Response) => {
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

      const user = await new ReadUserRepositories().findByEmail(dto.email);

      req.audit = {
        actionType: AuditLogActionType.POST,
        description: "Landlord Register in successfully",
        targetUserId: user?.getUserId()!,
        targetUserName: dto.name,
        targetUserRole: dto.role,
        record: "user,landlord",

        fieldName: {
          email: true,
          name: true,
          password: true,
          role: true,
          dateOfBirth: true,
          phoneNumber: true,
          cliQAccount: true,
          LandlordGovId: true,
          document: true,
        },
      };

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

      const user = await new ReadUserRepositories().findByEmail(dto.email);

      req.audit = {
        actionType: AuditLogActionType.POST,
        description: "Student Register in successfully",
        targetUserId: user?.getUserId()!,
        targetUserName: dto.name,
        targetUserRole: dto.role,
        record: "user,student",

        fieldName: {
          email: true,
          name: true,
          password: true,
          role: true,
          dateOfBirth: true,
          phoneNumber: true,
          major: true,
          gradateYear: true,
          studentCardId: true,
          universityName: true,
          studentGovId: true,
          verificationFile: true,
        },
      };

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

      let extractedUserId = "UNKNOWN";
      let user;

      if (result.token) {
        try {
          const base64Payload = result.token.split(".")[1];
          const payloadBuffer = Buffer.from(base64Payload, "base64");
          const payload = JSON.parse(payloadBuffer.toString());
          if (payload.userId) extractedUserId = payload.userId;

          user = await new ReadUserRepositories().findById(extractedUserId);
        } catch (e) {
          console.error("Token decode failed, using fallback ID");
        }
      }

      req.audit = {
        actionType: AuditLogActionType.POST,
        description: "User logged in successfully",
        targetUserId: extractedUserId,
        targetUserName: user?.getName()!,
        targetUserRole: user?.getRole()!,
        record: "user",
        fieldName: { email: true, password: true },
      };

      return res.status(201).json(result);
    } catch (error: any) {
      const status = error.statusCode || 400;

      return res
        .status(status)
        .json({ error: error.message || "internal server error" });
    }
  };
}
