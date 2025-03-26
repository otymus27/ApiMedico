import Consulta from "../models/Consultas.js";

const create = (data, medicoId, pacienteId) => Consulta.create({data, medicoId, pacienteId});

const listar = () => Consulta.find();

// Função de Paginação
const listarPaginado = async (page = 1, limit = 5) => {
  const skip = (page - 1) * limit;
  try {
    const consultas = await Consulta.find().skip(skip).limit(limit);
    const total = await Consulta.countDocuments();
    return { consultas, total };
  } catch (error) {
    throw new Error('Erro ao acessar o banco de dados.');
  }
};

const buscarPorId = (id) => Consulta.findById(id);

const excluir = (id) => Consulta.findByIdAndDelete(id);

const editar = ( id, data, medicoId, pacienteId ) =>
  Consulta.findOneAndUpdate(
    { _id: id },
    { id, data, medicoId, pacienteId },
    { rawResult: true }
  );

export default {
  create,
  listar,
  buscarPorId,
  editar,
  excluir,  
  listarPaginado,
};