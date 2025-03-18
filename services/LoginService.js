import jwt from "jsonwebtoken";
import medicoRepository from "../repositories/RepositoryMedicos.js";
import bcrypt from "bcrypt";
import "dotenv/config";

//Função responsável gerar o token
const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT,{expiresIn: 86400});

const autenticar = async ({ login,senha }) => {
    const medico = await medicoRepository.buscarPorLogin(login);
  
    // Verifica se usuário existe
    if (!medico) throw new Error("Usuário ou senha inválidos!!");
  
    // Verifica se a senha está correta
    const isPasswordValid = await bcrypt.compare(senha, medico.senha);
  
    if (!isPasswordValid) throw new Error("Senha inválida!!!");
  
    const token = generateToken(medico.id);
  
    return token;
  };

  export default { autenticar, generateToken };