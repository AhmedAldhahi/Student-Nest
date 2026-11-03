export interface ITokenPayload {
  userId: string;
}


export interface ITokenService {
  generateAccessToken(payload: ITokenPayload): string;
  generateRefreshToken(payload: ITokenPayload): string;

  verifyAccessToken(token: string): ITokenPayload | null;
  verifyRefreshToken(token: string): ITokenPayload | null;
}
