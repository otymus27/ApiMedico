import express from 'express';
import prescricaoControle from '../controllers/prescricao.controller.js';
import { validId, validUser } from '../middleware/global.middleware.js';


const router = express.Router();

// Rota para criar registro
router.post("/", prescricaoControle.create);

// Rota para listar registros
router.get("/", prescricaoControle.listar);

// Rota para buscar registros por id
router.get("/:id", validId, prescricaoControle.buscarPorId);

// Rota para excluir registro por id
router.delete("/:id", validId, prescricaoControle.excluir);

// Rota para atualizar um registro por id
router.patch("/:id", validId, prescricaoControle.editar);

export default router;