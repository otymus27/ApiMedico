import Prescricao  from "../models/Prescricao.js";

const listar = async () => {    
     try{
          return await Prescricao.find();
     }catch(error){
          throw new Error(error);
     }
}

const buscarPorId = async (id) => {
     try {
          return await Prescricao.findById(id);
     } catch (error) {
          throw new Error(error);
     }
}
   
const cadastrar = async ({data, consultaId, medicamento, dosagem, instrucoes}) =>{     
      
     try {
          const prescricao = new Prescricao({data, consultaId, medicamento, dosagem, instrucoes});
          return await prescricao.save();
     } catch (error) {
          throw new Error(error);
     }
}

const alterar = async (id, {data, consultaId, medicamento, dosagem, instrucoes, file}) =>{ 
     
     try {          
          return await Prescricao.findByIdAndUpdate(id, {data, consultaId, medicamento, dosagem, instrucoes, file}, {new: true});
     } catch (error) {
          throw new Error(error);
     }
}


const excluir = async (id) =>{
     try {
          return await Prescricao.findByIdAndDelete(id);
     } catch (error) {
          throw new Error(error);
     }
}


const prescricaoService = {
     listar,
     buscarPorId,
     cadastrar,
     alterar,
     excluir
}

export default prescricaoService;