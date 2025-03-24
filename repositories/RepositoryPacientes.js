import Paciente from "../models/Pacientes.js";

const create = (nome, email, telefone) => Paciente.create({ nome, email, telefone});

const listar = () => Paciente.find();

const listarPaginado = async (page = 1, limit=5) => {
    const skip = (page - 1) * limit;
    try {
        const pacientes = await Paciente.find().skip(skip).limit(limit);
        const total = await Medico.countDocuments();
        return { pacientes, total };
    } catch (error) {
        throw new Error("Erro ao acessar o banco de dados.");
    }
}

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
  listarPaginado,
};