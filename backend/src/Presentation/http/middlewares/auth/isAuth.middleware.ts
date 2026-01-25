import { Request, Response, NextFunction } from "express";
import { JwtTokenService } from "../../../../Infrastructure/Services/Security/TokenService.service";

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
    return res.status(400).json({ error: "missed, authorized header " });

  const token = header.split(" ")[1];

  if (!token) return res.status(400).json({ error: "No token found !!" });

  const SECRET_KEY = process.env.JWT_ACCESS_SECRET;

  if (!SECRET_KEY)
    return res.status(400).json({ error: "no secret key found !!" });

  const tokenService = new JwtTokenService();

  const payload = tokenService.verifyAccessToken(token);

  req.user = payload;
  return next();
};
