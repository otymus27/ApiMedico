import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import medicoService from "../services/MedicoService.js";



dotenv.config();

function verificarToken(req, res, next) {
  try {
    //Aqui pegamos o headers que vem da requisição, para pegar verificarmos se temos o token
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({ message: "sem autorizacao!" });
    }

    // Pegar a string que vem separada em duas partes e transformar em um array
    const parts = authorization.split(" ");

    // Aqui verificamos se o array tem duas posições, caso contrario retorna erro
    if (parts.length !== 2) {
      return res.status(401).send({ message: "sem autorizacao!" });
    }

    // Desestruturando o array para verificar o schema que é o Bearer e o token
    const [schema, token] = parts;

    // Aqui verificamos se o schema é diferente de Bearer  retorna erro
    if (schema !== "Bearer") {
      return res.status(401).send({ message: "sem autorizacao!" });
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ error: "Token invalido!" });
      }

      const medico = await medicoService.buscarPorId(decoded.id);

      if (!medico || !medico.id) {
        return res.status(401).send({ error: "Token invalido!" });
      }

      req.medicoId = medico._id;
      req.medicoNome = decoded.nome;
      return next();
    });
    
  } catch (error) {
    return res.status(401).send({ error: "Token invalido!" });
  }

}

export default verificarToken;
