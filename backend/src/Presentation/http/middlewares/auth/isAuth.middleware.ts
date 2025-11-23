import { Request, Response, NextFunction } from "express";
import { JwtTokenService } from "../../../../Infrastructure/services/TokenService.service";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /*
    process 
     check the head is it exist and start with Authorization
     check it have the header bearer 
     check that the token is exist
     check if token exist true and correct 
     decode the token 
    */

  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer"))
    throw new Error("missed, authorized header ");

  const token = header.split(" ")[1];

  if (!token) throw new Error("No token found !!");

  const SECRET_KEY = process.env.JWT_ACCESS_SECRET;

  if (!SECRET_KEY) throw new Error("no secret key found !!");

  const tokenService = new JwtTokenService();

  const payload = await tokenService.verifyAccessToken(token);
  
};
