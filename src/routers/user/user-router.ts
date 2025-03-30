import { Router } from "express";
import { signup } from "../../controllers/user/user-controller";

export const userRouter = Router();

userRouter.post("/signup", signup);
