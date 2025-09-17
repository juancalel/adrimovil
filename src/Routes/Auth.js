import { Router } from "express";
import { AuthController } from "../Controllers/AuthController.js";

export const AuthRouter = Router();

AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/register', AuthController.register);