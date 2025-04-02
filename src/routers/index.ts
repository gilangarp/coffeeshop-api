import { Router } from "express";
import { userRouter } from "./user/user-router";
import { authRouter } from "./user/auth-router";
import { productRouter } from "./product/product-router";

const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/", authRouter);
mainRouter.use("/product", productRouter);

export default mainRouter;
