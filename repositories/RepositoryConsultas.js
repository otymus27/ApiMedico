import Consulta  from "../models/Consultas.js";

const listar = async () => {
     try{
          return await Consulta.find();
     }catch(error){
          throw new Error(error);
     }
     
}

const buscarPorId = async (id) => {
     try {
          return await Consulta.findById(id);
     } catch (error) {
          throw new Error(error);
     }
}

const cadastrar = async ({data, medicoId, pacienteId}) =>{
     

     try {
          const consultas = new Consulta({data, medicoId, pacienteId});
          return await consultas.save();
     } catch (error) {
          throw new Error(error);
     }
}

const alterar = async (id, {data, medicoId, pacienteId}) =>{     

     try {          
          return await Consulta.findByIdAndUpdate(id, {data, medicoId, pacienteId}, {new: true});
     } catch (error) {
          throw new Error(error);
     }
}

const excluir = async (id) =>{
     try {
          return await Consulta.findByIdAndDelete(id);
     } catch (error) {
          throw new Error(error);
     }
}

const consultaRepository = {
     listar,
     buscarPorId,
     cadastrar,
     alterar,
     excluir,
}

export default consultaRepository;