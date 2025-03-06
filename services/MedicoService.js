import Medico from '../models/Medicos.js';

const create = (body) => Medico.create(body);

const listar = () => Medico.find();

const buscarPorId = (id) => Medico.findById(id);

const excluir = (id) => Medico.findByIdAndDelete(id);

const editar = (id, nome, login, senha, crm, especialidade) => Medico.findOneAndUpdate(
    { _id: id },
    { nome, login, senha, crm, especialidade },
    { new: true }
);

export default {create, listar, buscarPorId, excluir, editar};