import { Router } from "express";
import { userRouter } from "./user/user-router";
import { authRouter } from "./user/auth-router";

const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/", authRouter);
export default mainRouter;
