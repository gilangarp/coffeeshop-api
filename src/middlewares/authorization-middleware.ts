import { NextFunction, Request, Response } from "express";
import { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { IPayload } from "../models/auth/payload-model";
import { AppParams } from "../models/other/param-model";
import { IAuthResponse } from "../models/auth/auth-model";
import { handleError } from "../utils/handleError";

export const jwtOptions: SignOptions = {
  expiresIn: "12h",
  issuer: process.env.JWT_ISSUER,
};

export const authorization =
  (roles: string[]) =>
  (
    req: Request<AppParams>,
    res: Response<IAuthResponse>,
    next: NextFunction
  ) => {
    const bearerToken = req.header("Authorization");
    if (!bearerToken) {
      return handleError(res, 401, "Forbidden", "No access");
    }

    const token = bearerToken.split(" ")[1];
    jwt.verify(
      token,
      <string>process.env.JWT_SECRET,
      jwtOptions,
      (err, payload) => {
        if (err) {
          return handleError(res, 403, "Forbidden", err.message);
        }

        const userPayload = payload as IPayload;
        if (roles && !roles.includes(userPayload.role)) {
          return handleError(
            res,
            403,
            "Forbidden",
            "Access denied, insufficient permissions"
          );
        }
        req.userPayload = payload as IPayload;
        next();
      }
    );
  };
