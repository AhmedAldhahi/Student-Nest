"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const TokenService_service_1 = require("../../../../Infrastructure/services/TokenService.service");
const isAuth = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer"))
        throw new Error("missed, authorized header ");
    const token = header.split(" ")[1];
    if (!token)
        throw new Error("No token found !!");
    const SECRET_KEY = process.env.JWT_ACCESS_SECRET;
    if (!SECRET_KEY)
        throw new Error("no secret key found !!");
    const tokenService = new TokenService_service_1.JwtTokenService();
    const payload = await tokenService.verifyAccessToken(token);
};
exports.isAuth = isAuth;
