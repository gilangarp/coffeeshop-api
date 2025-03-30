import Joi from "joi";

const fullNameSchema = Joi.string().min(3).max(100).required().messages({
  "string.min": "Name must be at least 3 characters long.",
  "string.max": "Name must not exceed 100 characters.",
  "any.required": "Name is required.",
});

const emailSchema = Joi.string()
  .email()
  .pattern(/^.+@gmail\.com$/, "Gmail format")
  .required()
  .messages({
    "string.pattern.base": "Email must end with @gmail.com.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  });

const avatarSchema = Joi.string()
  .pattern(/\.(jpg|jpeg|png)$/i, "image file")
  .required()
  .messages({
    "string.pattern.base": "Avatar must be a valid image file (PNG or JPG).",
  });

const passwordSchema = Joi.string().min(6).required().messages({
  "string.min": "Password must be at least 6 characters long.",
  "any.required": "Password is required.",
});

const phoneNumberSchema = Joi.string()
  .pattern(/^08[0-9]{8,12}$/, "Phone number format")
  .required()
  .messages({
    "string.pattern.base":
      "Phone number must start with 08 and be followed by 8 to 12 digits.",
    "any.required": "Phone number is required.",
  });

const streetSchema = Joi.string().min(3).max(255).required().messages({
  "string.min": "Street must be at least 3 characters long.",
  "string.max": "Street must not exceed 255 characters.",
  "any.required": "Street is required.",
});

const citySchema = Joi.string().min(2).max(100).required().messages({
  "string.min": "City must be at least 2 characters long.",
  "string.max": "City must not exceed 100 characters.",
  "any.required": "City is required.",
});

const stateSchema = Joi.string().max(100).optional().messages({
  "string.max": "State must not exceed 100 characters.",
});

const postalCodeSchema = Joi.string().max(20).optional().messages({
  "string.max": "Postal code must not exceed 20 characters.",
});

const countrySchema = Joi.string().min(2).max(100).required().messages({
  "string.min": "Country must be at least 2 characters long.",
  "string.max": "Country must not exceed 100 characters.",
  "any.required": "Country is required.",
});

export const signupSchema = Joi.object({
  name: fullNameSchema,
  email: emailSchema,
  password: passwordSchema,
  street: streetSchema,
  city: citySchema,
  state: stateSchema,
  postalCode: postalCodeSchema,
  country: countrySchema,
});

export const signInSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});
