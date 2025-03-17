import Prescricao from "../models/Medicos";

const create = (data, consultaId, medicamento, dosagem, instrucoes) => Prescricao.create({ data, consultaId, medicamento, dosagem, instrucoes});

const listar = () => Prescricao.find();

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
};