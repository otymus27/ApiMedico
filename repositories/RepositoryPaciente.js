import Paciente  from "../models/Pacientes.js";

const listar = async () => {
     
     try{
          return await Paciente.find();
     }catch(error){
          throw new Error(error);
     }
}

const buscarPorId = async (id) => {
     try {
          return await Paciente.findById(id);
     } catch (error) {
          throw new Error(error);
     }
}

const cadastrar = async ({nome, email, telefone}) =>{ 
     
     try {
          const prescricao = new Paciente({nome, email, telefone});
          return await prescricao.save();
     } catch (error) {
          throw new Error(error);
     }
}

const alterar = async (id, {nome, email, telefone}) =>{
     
     try {          
          return await Paciente.findByIdAndUpdate(id, {nome, email, telefone}, {new: true});
     } catch (error) {
          throw new Error(error);
     }
}

const excluir = async (id) =>{
     try {
          return await Paciente.findByIdAndDelete(id);
     } catch (error) {
          throw new Error(error);
     }
}

const pacienteRepository = {
     listar,
     buscarPorId,
     cadastrar,
     alterar,
     excluir,
}

export default pacienteRepository;