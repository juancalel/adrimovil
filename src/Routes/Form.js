import { Router } from "express";
import { FormController } from "../Controllers/FormController.js"
import AuthenticationMiddleware from "../Middlewares/AuthenticationMiddleware.js";

export const FormRouter = Router();

// Define tus rutas aquí, por ejemplo:
FormRouter.get("/", AuthenticationMiddleware, FormController.getAllForms);
FormRouter.get("/:id", AuthenticationMiddleware, FormController.getFormById);
FormRouter.post("/", AuthenticationMiddleware, FormController.createForm);
FormRouter.put("/:id", AuthenticationMiddleware, FormController.updateForm);
FormRouter.delete("/:id", AuthenticationMiddleware, FormController.deleteForm);
