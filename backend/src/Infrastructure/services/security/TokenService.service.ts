import * as jwt from "jsonwebtoken";
import { ITokenPayload, ITokenService } from "../../../Application/interfaces/IToken.interface";


export class JwtTokenService implements ITokenService {
  // 1. Read secrets from .env
  private readonly accessSecret: string;
  private readonly refreshSecret: string;

  constructor() {
    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
      throw new Error(
        "JWT secret keys are not defined in environment variables."
      );
    }
    this.accessSecret = process.env.JWT_ACCESS_SECRET;
    this.refreshSecret = process.env.JWT_REFRESH_SECRET;
  }

  // 2. Implement the interface methods
  generateAccessToken(payload: ITokenPayload): string {
    return jwt.sign(payload, this.accessSecret, {
      expiresIn: "15m", // Access tokens should be short-lived
    });
  }

  generateRefreshToken(payload: ITokenPayload): string {
    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: "7d", // Refresh tokens are long-lived
    });
  }

  verifyAccessToken(token: string): ITokenPayload | null {
    try {
      // 3. Verify the token against the correct secret
      const payload = jwt.verify(token, this.accessSecret) as ITokenPayload;
      return payload;
    } catch (error) {
      // Token is invalid (expired, wrong signature, etc.)
      return null;
    }
  }

  verifyRefreshToken(token: string): ITokenPayload | null {
    try {
      const payload = jwt.verify(token, this.refreshSecret) as ITokenPayload;
      return payload;
    } catch (error) {
      return null;
    }
  }
}
