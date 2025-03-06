import mongoose from 'mongoose';
import medicoService from '../services/MedicoService.js';



// Aqui estamos criando um middleware, que literalmente é um interceptador

// Função para validar o ID
export const validId = (req, res, next) => {
    try {
        // Receber um ID
        const id = req.params.id;

        // Verificar se o parâmetro está correto
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "ID inválido!" });
        }

        // Função para avançar
        next();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

// Função para validar se user existe
export const validUser = async (req, res, next) => {
    try {
        // Receber um ID
        const id = req.params.id;

        // Verificar se o parâmetro está correto
        const medico = await medicoService.buscarPorId(id);

        // Verificar se existe algum registro vindo do banco de dados
        if (!medico) {
            return res.status(400).send({ message: "Nenhum registro cadastrado!" });
        }

        // Função para avançar
        next();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }


}




