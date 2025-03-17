import Consulta from "../models/Medicos";

const create = (data, medicoId, pacienteId) => Consulta.create({data, medicoId, pacienteId});

const listar = () => Consulta.find();

const buscarPorId = (id) => Consulta.findById(id);

// const buscarPorLogin = (login) => Medico.findOne({ login: login });

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
};