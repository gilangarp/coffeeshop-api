import { Request, Response } from "express";
import { signupSchema } from "../../schemas/user/user-schema";
import { handleError, handleJoiValidationError } from "../../utils/handleError";
import bcrypt from "bcrypt";
import { IRegisterResponse, ISignupDto } from "../../models/user/user-model";
import {
  createUser,
  findUserByEmail,
} from "../../repository/user/user-repository";
import db from "../../configs/pg";
import { createAddress } from "../../repository/user/address-repository";
import { IPayload } from "../../models/auth/payload-model";
import { jwtOptions } from "../../middlewares/authorization-middleware";
import jwt from "jsonwebtoken";

export const signup = async (
  req: Request<{}, {}, ISignupDto>,
  res: Response<IRegisterResponse>
): Promise<Response<IRegisterResponse>> => {
  const client = await db.connect();
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      await client.query("ROLLBACK");
      return handleJoiValidationError(res, error);
    }

    const existingUser = await findUserByEmail(req.body.email, client);
    if (existingUser.rows.length > 0) {
      await client.query("ROLLBACK");
      return handleError(
        res,
        400,
        "email already exists",
        "Email already in use. Please choose another one."
      );
    }

    const addressResponseDb = await createAddress(req.body, client);
    if (!addressResponseDb || !addressResponseDb.rows) {
      await client.query("ROLLBACK");
      return handleError(
        res,
        404,
        "Address Creation Failed",
        "Something went wrong, please try again later signup."
      );
    }

    const uuidAddress = addressResponseDb.rows[0].uuid;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userResponseDb = await createUser(
      req.body,
      hashedPassword,
      uuidAddress,
      client
    );
    const { uuid, role } = userResponseDb.rows[0];

    const payload: IPayload = {
      sub: uuid,
      role: role,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      jwtOptions
    );

    await client.query("COMMIT");
    return res.status(201).json({
      data: { token, uuid, role },
    });
  } catch (error) {
    console.error("Error details:", error);
    await client.query("ROLLBACK");

    return handleError(
      res,
      500,
      "Internal Server Error",
      "An unexpected error occurred. Please try again later."
    );
  } finally {
    client.release();
  }
};
