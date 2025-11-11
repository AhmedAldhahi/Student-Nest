export interface ITokenPayload {
  userId: string;
}

/**
 * This is the interface our Application Layer will depend on.
 */
export interface ITokenService {
  generateAccessToken(payload: ITokenPayload): string;
  generateRefreshToken(payload: ITokenPayload): string;

  verifyAccessToken(token: string): ITokenPayload | null;
  verifyRefreshToken(token: string): ITokenPayload | null;
}
