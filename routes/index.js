import { Router } from "express";
import medicoRouter from "./medicos.route.js";
import swaggerRoute from "./swagger.route.js";
import loginRouter from "./login.route.js";

const router = Router();

// Usando as rotas
router.use("/medicos", medicoRouter);
router.use("/login", loginRouter);
//router.use("/pacientes", pacienteRoute);
router.use("/doc", swaggerRoute);

export default router;