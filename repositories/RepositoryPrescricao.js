import Prescricao from "../models/Prescricao.js";

const create = (data, consultaId, medicamento, dosagem, instrucoes) => Prescricao.create({ data, consultaId, medicamento, dosagem, instrucoes});

const listar = () => Prescricao.find();

// Função de Paginação
const listarPaginado = async (page = 1, limit = 5) => {
  const skip = (page - 1) * limit;
  try {
    const prescricoes = await Prescricao.find().skip(skip).limit(limit);
    const total = await Prescricao.countDocuments();
    return { prescricoes, total };
  } catch (error) {
    throw new Error('Erro ao acessar o banco de dados.');
  }
};

const buscarPorId = (id) => Prescricao.findById(id);

const buscarPorEmail = (email) => Prescricao.findOne({ email: email });

const excluir = (id) => Prescricao.findByIdAndDelete(id);

const editar = ( id, data, consultaId, medicamento, dosagem, instrucoes ) =>
  Prescricao.findOneAndUpdate(
    { _id: id },
    { id, data, consultaId, medicamento, dosagem, instrucoes },
    { rawResult: true }
  );

export default {
  create,
  listar,
  buscarPorId,
  editar,
  excluir,  
  buscarPorLogin: buscarPorEmail,
  listarPaginado,
};