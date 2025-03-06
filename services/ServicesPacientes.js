import pacienteRepository from "../repositories/RepositoryPaciente.js";

const listar = async () => {
     return pacienteRepository.listar();
}


const buscarPorId = async (id) => {
     return pacienteRepository.buscarPorId(id);
}
   
const cadastrar = async ({nome, email, telefone}) =>{     
     return pacienteRepository.cadastrar({nome, email, telefone});     
}

const alterar = async (id, {nome, email, telefone}) =>{            
     return await pacienteRepository.alterar(id, {nome, email, telefone});    
}

const excluir = async (id) =>{
     return pacienteRepository.excluir(id);
}


const pacienteService = {
     listar,
     buscarPorId,
     cadastrar,
     alterar,
     excluir
}

export default pacienteService;