import express from 'express';
import medicoControle from '../controllers/medico.controller.js';
import { validId, validUser } from '../middleware/global.middleware.js';
import autenticacao from '../middleware/autenticacao.middleware.js';

const router = express.Router();

// Rota para criar registro
router.post("/", medicoControle.create);

// Rota para listar registros
router.get("/", medicoControle.listar);

// Rota para buscar registros por id
router.get("/:id",autenticacao, validId, validUser, medicoControle.buscarPorId);

// Rota para excluir registro por id
router.delete("/:id", medicoControle.excluir);

// Rota para atualizar um registro por id
router.patch("/:id", validId, validUser, medicoControle.editar);

export default router;