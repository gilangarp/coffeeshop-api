import { Router } from "express";
import { signIn } from "../../controllers/auth/auth-controller";

export const authRouter = Router();

authRouter.post("/signin", signIn);
