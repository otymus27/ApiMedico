import Medico  from "../models/Medicos.js";

const listar = async () => {    

     try{
          return await Medico.find();
     }catch(error){          
          throw new Error("Erro listar: " +error);
     }
}

const buscarPorId = async (id) => {
     try {
          return await Medico.findById(id);
     } catch (error) {
          throw new Error("Erro buscar: " +error);
     }
}

const cadastrar = async ({nome, login, senha, crm, especialidade}) =>{ 
     

     try {
          const prescricao = new Medico({nome, login, senha, crm, especialidade});
          return await prescricao.save();
     } catch (error) {          
          throw new Error("Erro cadastrar: " +error);
     }
}

const alterar = async (id, {nome, login, senha, crm, especialidade}) =>{     

     try {          
          return await Medico.findByIdAndUpdate(id, {nome, login, senha, crm, especialidade}, {new: true});       
     } catch (error) {
          throw new Error("Erro ao alterar: " +error);         
     }
}

const excluir = async (id) =>{
     try {
          return await Medico.findByIdAndDelete(id);
     } catch (error) {        
          throw new Error("Erro ao excluir: " +error);
     }
}


//aqui pegamos o login passado na requisicao
const logarPorLogin = async (login) => {
     try {
          return await Medico.findOne({"login": login});
     } catch (error) {
          throw new Error("Erro no logarPorLogin "+error);
          
     }
}

const medicoRepository = {
     listar,
     buscarPorId,
     cadastrar,
     alterar,
     excluir,
     logarPorLogin
}

export default medicoRepository;