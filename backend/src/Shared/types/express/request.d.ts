import { Request } from "express";
import { ITokenPayload } from "../../../Application/interfaces/IToken.interface";

declare module "express" {
  interface Request {
    user?: ITokenPayload | null;
  }
}
