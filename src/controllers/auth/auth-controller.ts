import { Request, Response } from "express";
import { IAuthDto, IAuthResponse } from "../../models/auth/auth-model";
import { getByEmail } from "../../repository/auth/auth-repository";
import { handleError, handleJoiValidationError } from "../../utils/handleError";
import bcrypt from "bcrypt";
import { IPayload } from "../../models/auth/payload-model";
import jwt from "jsonwebtoken";
import { jwtOptions } from "../../middlewares/authorization-middleware";
import { signInSchema } from "../../schemas/user/user-schema";

export const signIn = async (
  req: Request<{}, {}, IAuthDto>,
  res: Response<IAuthResponse>
): Promise<Response<IAuthResponse>> => {
  try {
    const { email, password } = req.body;

    const { error } = signInSchema.validate(req.body);
    if (error) {
      return handleJoiValidationError(res, error);
    }

    const data = await getByEmail(email);
    if (!data.rows || data.rows.length === 0) {
      return handleError(
        res,
        404,
        "Email not found",
        "The email you entered is incorrect"
      );
    }

    const { address, hash, uuid, role, is_deleted } = data.rows[0];

    if (is_deleted === true) {
      return handleError(
        res,
        404,
        "Email not found",
        "Access is denied for this email, the account has been deactivated"
      );
    }

    const isPwdValid = await bcrypt.compare(password, hash);
    if (!isPwdValid) {
      handleError(
        res,
        401,
        "Authentication failed",
        "The password you entered is incorrect"
      );
    }

    const payload: IPayload = {
      sub: uuid,
      role: role,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      jwtOptions
    );

    const isNewUser = address ? false : true;

    return res.status(200).json({
      data: { token, uuid, role, is_new_user: isNewUser },
    });
  } catch (error) {
    console.error("Error details:", error);
    return handleError(
      res,
      500,
      "Internal Server Error",
      "An unexpected error occurred. Please try again later."
    );
  }
};
