import medicoRepository from "../repositories/RepositoryMedicos.js";

const listar = async () => {
     return await medicoRepository.listar();
}


const buscarPorId = async (id) => {
     return medicoRepository.buscarPorId(id);
}
   
const cadastrar = async ({nome, login, senha, crm, especialidade}) =>{     
     return medicoRepository.cadastrar({nome, login, senha, crm, especialidade});     
}

const alterar = async (id, {nome, login, senha, crm, especialidade}) =>{            
     return await medicoRepository.alterar(id, {nome, login, senha, crm, especialidade});    
}

const excluir = async (id) =>{
     return await medicoRepository.excluir(id);
}

const logarPorLogin = async (login) => {
     return await medicoRepository.logarPorLogin(login);
}

//login
const medicoService = {
     listar,
     buscarPorId,
     cadastrar,
     alterar,
     excluir,
     logarPorLogin
}

export default medicoService;