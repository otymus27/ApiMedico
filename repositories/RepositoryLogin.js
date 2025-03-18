import Medico from "../models/Medicos.js";

const loginRepository = (login) => Medico.findOne({ login: login }); // temos chaves dentro da função, temos um filtro de pesquisa 

export { loginRepository };