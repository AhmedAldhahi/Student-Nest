// types/express.d.ts
import { Request } from "express";
import { AuditLogActionType } from "../../../Domain/BoundedContexts/adminstration/Enum/AuditLogAction.enum";
import { UserRole } from "../../../Domain/Shared/Enum/UserRole.enum";
import { ITokenPayload } from "../../../Application/Interfaces/IToken.interface";
declare module "express" {
  interface Request {
    // Authenticated user from token
    user?: ITokenPayload | null;

    // Audit log context for global middleware
    audit?: {
      actionType: AuditLogActionType;
      description: string;

      targetUserId: string;
      targetUserName: string;
      targetUserRole: UserRole;

      record: string;
      fieldName: Record<string, any>;
      oldValue?: Record<string, any>;
      newValue?: Record<string, any>;
    };
  }
}
