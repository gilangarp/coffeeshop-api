import Joi from "joi";

const categorySchema = Joi.number().integer().required().messages({
  "any.required": "Category is required.",
  "number.base": "Category must be a valid category ID.",
  "number.integer": "Category must be an integer.",
});

const imageSchema = Joi.string()
  .pattern(/\.(jpg|jpeg|png)$/i, "image file")
  .required()
  .messages({
    "string.pattern.base": "Image must be a valid image file (PNG or JPG).",
  });

const productNameSchema = Joi.string().min(3).max(255).required().messages({
  "string.min": "Product name must be at least 3 characters long.",
  "string.max": "Product name must not exceed 255 characters.",
  "any.required": "Product name is required.",
  "string.base": "Product name must be a string.",
});

const productDescriptionSchema = Joi.string().min(10).required().messages({
  "string.min": "Description must be at least 10 characters long.",
  "any.required": "Description is required.",
  "string.base": "Description must be a string.",
});

const productPriceSchema = Joi.number().positive().required().messages({
  "number.base": "Price must be a valid number.",
  "number.positive": "Price must be a positive number.",
  "any.required": "Price is required.",
});

const productDiscountSchema = Joi.number().min(0).max(100).optional().messages({
  "number.base": "Discount must be a valid number.",
  "number.min": "Discount must be at least 0.",
  "number.max": "Discount cannot exceed 100.",
});

const productStockSchema = Joi.number().integer().min(0).optional().messages({
  "number.base": "Stock must be a valid number.",
  "number.integer": "Stock must be an integer.",
  "number.min": "Stock cannot be negative.",
});

const categoryIdSchema = categorySchema;

const imagesSchema = Joi.string()
  .pattern(/\.(jpg|jpeg|png)$/i, "image file")
  .required()
  .messages({
    "string.pattern.base": "Image must be a valid image file (PNG or JPG).",
  });

const categoryNameSchema = Joi.string().min(3).max(255).required().messages({
  "string.min": "Category name must be at least 3 characters long.",
  "string.max": "Category name must not exceed 255 characters.",
  "any.required": "Category name is required.",
  "string.base": "Category name must be a string.",
});

export const createProductSchema = Joi.object({
  name: productNameSchema,
  description: productDescriptionSchema,
  price: productPriceSchema,
  discount: productDiscountSchema,
  categoryId: categorySchema,
  stock: productStockSchema,
});
