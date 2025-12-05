"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const TokenService_service_1 = require("../../../../Infrastructure/services/security/TokenService.service");
const isAuth = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer"))
        return res.status(400).json({ error: "missed, authorized header " });
    const token = header.split(" ")[1];
    if (!token)
        return res.status(400).json({ error: "No token found !!" });
    const SECRET_KEY = process.env.JWT_ACCESS_SECRET;
    if (!SECRET_KEY)
        return res.status(400).json({ error: "no secret key found !!" });
    const tokenService = new TokenService_service_1.JwtTokenService();
    const payload = tokenService.verifyAccessToken(token);
    req.user = payload;
    return next();
};
exports.isAuth = isAuth;
