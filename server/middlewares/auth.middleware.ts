import { verify, JwtPayload } from "jsonwebtoken";
import { StatusCode } from "status-code-enum";
import { Request, Response, NextFunction } from "express";

type TokenPayload = JwtPayload & {
  id: string;
  email: string;
  name: string;
};

export const authMiddleWare =
  (secret: string) => (req: Request, res: Response, next: NextFunction) => {
    return next()
    const isNotProtected = req.url.startsWith("/users");
    if (isNotProtected) {
      return next();
    }
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(StatusCode.ClientErrorUnauthorized)
        .send("unauthorized");
    }
    try {
      const payload = verify(token, secret) as TokenPayload;
      req.user = {
        id: payload.id,
        email: payload.email,
        name: payload.name,
      };
      next();
    } catch (e) {
      console.error(e);
      return res
        .status(StatusCode.ClientErrorUnauthorized)
        .send("unauthorized");
    }
  };
