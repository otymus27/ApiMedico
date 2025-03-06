import Medico from "../models/Medicos.js";
import jwt from "jsonwebtoken";


const loginService = (login) => Medico.findOne({ login: login }); // temos chaves dentro da função, temos um filtro de pesquisa 

//Função responsável para guardar a sessão do usuário, os dados do usuário, etc
const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT,{expiresIn: 86400});

export { loginService, generateToken };