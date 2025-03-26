import express from 'express';
import consultaControle from '../controllers/consulta.controller.js';
import { validId, validUser } from '../middleware/global.middleware.js';


const router = express.Router();

// Rota para criar registro
router.post("/", consultaControle.create);

// Rota para listar registros
router.get("/", consultaControle.listar);

// Rota para buscar registros por id
router.get("/:id", validId, consultaControle.buscarPorId);

// Rota para excluir registro por id
router.delete("/:id", validId, consultaControle.excluir);

// Rota para atualizar um registro por id
router.patch("/:id", validId, consultaControle.editar);

export default router;