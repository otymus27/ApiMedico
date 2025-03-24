import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import medicoService from '../services/ServicesMedicos.js';



dotenv.config();

function verificarToken(req, res, next) {
  try {
      //Aqui pegamos o headers que vem da requisição, para pegar verificarmos se temos o token
      const { authorization } = req.headers;

      // Verificar se o cabeçalho existe
      if (!authorization) {
          return res.status(401).json({ message: "Sem autorização! Cabeçalho não fornecido." });
      }

      // Pegar a string que vem separada em duas partes e transformar em um array
      const parts = authorization.split(" ");

      // Verificar se o esquema e o token estão presentes
      if (parts.length !== 2) {
          return res.status(401).json({ message: "Token malformado!" });
      }

      // Desestruturar para obter o esquema e o token
      const [schema, token] = parts;

      // Verificar se o esquema é "Bearer"
      if (schema !== "Bearer") {
        return res.status(401).json({ message: "Token sem o prefixo Bearer!" });
      }

      // Verificar se o token está vazio
      if (!token) {
        return res.status(401).json({ message: "Token não fornecido!" });
      }

      // Verificar o token JWT
      jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
          if (error) {
            return res.status(401).send({ error: "Token invalido ou expirado!" });
          }

          try {
              const medico = await medicoService.buscarPorId(decoded.id);
              if (!medico || !medico.id) {
                return res.status(401).send({ error: "Token invalido!" });
              }            
              
              // Anexar as informações ao objeto de requisição
              req.medicoId = medico._id;
              req.medicoNome = medico.nome;
              req.medicoLogin = medico.login

              return next();
          } catch (dberror) {
              return res.status(500).json({ error: "Erro no middleware - Erro ao buscar usuário no banco de dados." });
          }
          
      });
      
    } catch (error) {
        return res.status(500).json({ error: "Erro interno no servidor." });
    }

}

export default verificarToken;
