import express from 'express';
import pacienteControle from '../controllers/paciente.controller.js';
import { validId, validUser } from '../middleware/global.middleware.js';
import autenticacao from '../middleware/autenticacao.middleware.js';

const router = express.Router();

// Rota para criar registro
router.post("/", pacienteControle.create);

// Rota para listar registros
router.get("/", pacienteControle.listar);

// Rota para buscar registros por id
router.get("/:id", validId, pacienteControle.buscarPorId);

// Rota para excluir registro por id
router.delete("/:id", validId, pacienteControle.excluir);

// Rota para atualizar um registro por id
router.patch("/:id", validId, pacienteControle.editar);

export default router;