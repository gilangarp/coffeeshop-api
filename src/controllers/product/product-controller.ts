import { Request, Response } from "express";
import { createProductSchema } from "../../schemas/product/product-schema";
import { IProductDto } from "../../models/product/product-model";
import { handleError, handleJoiValidationError } from "../../utils/handleError";
import db from "../../configs/pg";
import {
  createDataImage,
  createDataProduct,
} from "../../repository/product/product-repository";
import { cloudinaryArrayUploader } from "../../helpers/cloudinary-helper";

export const createProduct = async (
  req: Request<{}, {}, IProductDto>,
  res: Response
) => {
  const client = await db.connect();
  try {
    const { error } = createProductSchema.validate(req.body);
    if (error) {
      return handleJoiValidationError(res, error);
    }

    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return handleError(
        res,
        400,
        "Input error",
        "Product images cannot be null"
      );
    }

    await client.query("BEGIN");

    const { results, errors } = await cloudinaryArrayUploader(
      req,
      `product-${req.body.name}`
    );

    const productDb = await createDataProduct(req.body, client);
    if (!productDb) {
      await client.query("ROLLBACK");
      return handleError(
        res,
        404,
        "Internal Server Error",
        "Something went wrong, please try again later"
      );
    }

    const productInfo = productDb.rows[0];

    if (errors && errors.length > 0) {
      await client.query("ROLLBACK");
      return handleError(
        res,
        400,
        "Upload error",
        `Failed to upload images: ${errors
          .map((err) => err.message)
          .join(", ")}`
      );
    }

    const secureUrls = results?.map((result) => result.secure_url) || [];
    const imagePromises = secureUrls.map((url) =>
      createDataImage(productInfo.uuid, url, client)
    );
    const imgResults = await Promise.all(imagePromises);

    if (!imgResults || imgResults.some((result) => !result)) {
      await client.query("ROLLBACK");
      return handleError(
        res,
        404,
        "Internal Server Error",
        "Something went wrong with the image saving process. Please try again later."
      );
    }

    await client.query("COMMIT");

    return res.status(201).json({
      code: 201,
      msg: `Product ${productInfo.name} created successfully`,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error details:", error);

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
