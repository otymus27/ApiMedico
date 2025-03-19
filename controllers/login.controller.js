// Importar módulo responsável pela comunicação com o banco de dados
import loginService from "../services/LoginService.js";


const login = async (req, res) => {
     //Receber os dados de um formulario, chegando através do body 
     const { login, senha } = req.body;

     try {      
          // Aqui passando parametros para logar e receber o token
          const token = await loginService.autenticar({login, senha});

          // Aqui estou enviando o token como resposta
          //return res.send(token);       
          return res.send({token, login});      
     } catch (error) {
          return res.status(401).send("Erro no controller de login: "+error.message);
     }
     
}

export default {login}