import { Router } from "express";
import medicoRouter from "./medicos.route.js";
import pacienteRouter from "./pacientes.route.js";
import consultaRouter from "./consultas.route.js";
import prescricaoRouter from "./prescricao.route.js";
import swaggerRouter from "./swagger.route.js";
import loginRouter from "./login.route.js";

const router = Router();

// Usando as rotas
router.use("/medicos", medicoRouter);
router.use("/login", loginRouter);
router.use("/pacientes", pacienteRouter);
router.use("/consultas", consultaRouter);
router.use("/prescricao", prescricaoRouter);
router.use("/doc", swaggerRouter);

export default router;