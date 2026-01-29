import { CreateLandlordCommandHandler } from "../../../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/CreateLandlordCommandHandler";
import { CreateStudentCommandHandler } from "../../../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/CreateStudentCommandHandler";
import { UserLoginQueriesHandler } from "../../../../Application/BoundedContexts/IdentityAndAccess/QueriesHandler/UserLoginQueriesHandler";
import { AuditLogActionType } from "../../../../Domain/BoundedContexts/adminstration/Enum/AuditLogAction.enum";
import { ReadUserRepositories } from "../../../../Infrastructure/Repositories/Read/ReadUserRepositories";
import { Request, Response } from "express";

export class AuthController {
  constructor(
    private registerLandlordCH: CreateLandlordCommandHandler,
    private registerStudentCH: CreateStudentCommandHandler,
    private loginUserQH: UserLoginQueriesHandler
  ) {}

  public registerLandlord = async (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.file);

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

      const result = await this.registerLandlordCH.handle(dto);

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

      if (!fileToUpload) {
        return res.status(400).json({ error: "Verification file is required" });
      }

      const dto = {
        ...req.body,
        verificationFile: fileToUpload,
      };

      // 4. EXECUTE USE CASE
      const result = await this.registerStudentCH.handle(dto);

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
      const result = await this.loginUserQH.handle(dto);

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
