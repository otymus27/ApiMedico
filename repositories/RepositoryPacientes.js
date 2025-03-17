import Paciente from "../models/Medicos";

const create = (nome, email, telefone) => Paciente.create({ nome, email, telefone});

const listar = () => Paciente.find();

const buscarPorId = (id) => Paciente.findById(id);

const buscarPorEmail = (email) => Paciente.findOne({ email: email });

const excluir = (id) => Paciente.findByIdAndDelete(id);

const editar = ( id, nome, email, telefone ) =>
  Paciente.findOneAndUpdate(
    { _id: id },
    { id, nome, email, telefone },
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