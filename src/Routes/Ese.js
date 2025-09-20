import { Router } from "express";
import AuthenticationMiddleware from "../Middlewares/AuthenticationMiddleware.js";
import { EseController } from "../Controllers/EseController.js";

export const EseRouter = Router();

// Define tus rutas aquí, por ejemplo:
EseRouter.get("/:id", AuthenticationMiddleware, EseController.getAllEseForm);
EseRouter.post("/:id/registro", AuthenticationMiddleware, EseController.createEseRegister);
EseRouter.post("/beneficiario/:id", AuthenticationMiddleware, EseController.createEseBeneficiary);
EseRouter.post("/economico/:id", AuthenticationMiddleware, EseController.createEseEconomic);
EseRouter.post("/vivienda/:id", AuthenticationMiddleware, EseController.createEseDwelling);
EseRouter.post("/servicios/:id", AuthenticationMiddleware, EseController.createEseServices);