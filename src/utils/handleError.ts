import { Response } from "express";
import Joi from "joi";
import { IBasicResponse } from "../models/other/basic-model";

export const handleError = (
  res: Response,
  statusCode: number,
  errorMessage: string,
  userMessage: string,
  detailMessage?: string
) => {
  const response: IBasicResponse = {
    message: errorMessage,
    error: {
      message: userMessage,
      ...(detailMessage && { details: detailMessage }),
    },
  };

  return res.status(statusCode).json(response);
};

export const handleJoiValidationError = (
  res: Response,
  error: Joi.ValidationError
) => {
  const errorDetails = error.details
    .map((e) => e.message.replace(/\"/g, ""))
    .join(", ");

  return handleError(res, 400, "Validation Failed", errorDetails);
};
