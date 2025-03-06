import consultaRepository from "../repositories/RepositoryConsultas.js";

const listar = async () => {
     return consultaRepository.listar();
}


const buscarPorId = async (id) => {
     return consultaRepository.buscarPorId(id);
}
   
const cadastrar = async ({data, medicoId, pacienteId}) =>{     
     return consultaRepository.cadastrar({data, medicoId, pacienteId});     
}

const alterar = async (id, {data, medicoId, pacienteId}) =>{            
     return await consultaRepository.alterar(id, {data, medicoId, pacienteId});    
}

const excluir = async (id) =>{
     return consultaRepository.excluir(id);
}


const consultaService = {
     listar,
     buscarPorId,
     cadastrar,
     alterar,
     excluir
}

export default consultaService;