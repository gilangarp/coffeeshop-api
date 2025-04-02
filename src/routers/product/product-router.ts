import { Router } from "express";
import { createProduct } from "../../controllers/product/product-controller";
import { multiCloudUploader } from "../../middlewares/cloudinary-middleware";

export const productRouter = Router();

productRouter.post(
  "/add",
  multiCloudUploader("imageHandler", 3),
  createProduct
);
