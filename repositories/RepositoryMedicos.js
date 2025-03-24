import Medico from "../models/Medicos.js";

const create = (nome, login, senha, crm, especialidade) => Medico.create({nome, login, senha, crm, especialidade});

const listar = () => Medico.find();


const listarPaginado = async (page = 1, limit=5) => {
    const skip = (page - 1) * limit;
    try {
        const medicos = await Medico.find().skip(skip).limit(limit);
        const total = await Medico.countDocuments();
        return { medicos, total };
    } catch (error) {
        throw new Error("Erro ao acessar o banco de dados.");
    }
}


const buscarPorId = (id) => Medico.findById(id);

const buscarPorLogin = (login) => Medico.findOne({ login: login });

const excluir = (id) => Medico.findByIdAndDelete(id);

const editar = ( id, nome, login, senha, crm, especialidade ) =>
  Medico.findOneAndUpdate(
    { _id: id },
    { id, nome, login, senha, crm, especialidade },
    { rawResult: true }
  );

export default {
  create,
  listar,
  buscarPorId,
  editar,
  excluir,  
  buscarPorLogin,
  listarPaginado,
};