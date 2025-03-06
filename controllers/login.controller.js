import bcrypt from "bcrypt";

// Importar módulo responsável pela comunicação com o banco de dados
import {loginService, generateToken} from "../services/LoginService.js";



const login = async (req, res) => {
     //Receber os dados de um formulario, chegando através do body 
     const { login, senha } = req.body;
     try {         
          const user = await loginService(login);
          
          // Verifica se usuário existe
          if (!user) {
               return res.status(404).send({message: "Senha ou usuário inválidos!!!"} );
          }

          const senhaValida = bcrypt.compareSync(senha, user.senha);
          //console.log(senhaValida)
          // Verifica se a senha está correta
          if(!senhaValida){
               return res.status(404).send({message: "Senha ou usuário inválidos!!!"} );
          }

          const token = generateToken(user.id);

          // Aqui estou enviando o token como objeto e não texto que seria sem chaves.
          res.send({token});          
     } catch (error) {
          res.status(500).send({ message: error.message });
     }
     
}

export default {login}