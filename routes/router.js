import express from "express";
import controllerConsultas from "./ControllerConsultas.js";
import controllerMedicos from "./ControllerMedicos.js";
import controllerPacientes from "./ControllerPacientes.js";
import controllerPrescricao from "./ControllerPrescricao.js";
import verificarToken from "../middleware/autenticacaoMiddlewara.js";
import medicoService from "../services/ServicesMedicos.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//faz o roteamento automatico de rotas
let router = express.Router();

//rota de entrada principal
router.get("/", (req, res) => {
  console.log("Olá");
  res.status(200).json({ message: "Olá, tudo ok!!!" });
});



//mapeamento do login
router.post("/login", async (req, res) => {
  
  try {
    const { login, senha } = req.body;
        
    const medico = await medicoService.logarPorLogin(login);   

    if (!medico) {
      return res
        .status(403)
        .json({ error: "Autenticação falhou - campo login invalido!" });
    }

    const senhaComparada = await bcrypt.compare(senha, medico.senha);
    if (!senhaComparada) {
      return res
        .status(401)
        .json({ error: "Autenticação falhou - campo senha invalido!" });
    }

    const token = jwt.sign({ medicoId: medico._id }, "you-secret-key", {
      expiresIn:'1h',//expira em 24hs
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Login falhou teste!" });
  }
});

router.use("/", verificarToken, controllerConsultas);
router.use("/", verificarToken, controllerMedicos);
router.use("/", verificarToken, controllerPacientes);
router.use("/", verificarToken, controllerPrescricao);

//rotas sem autenticacao - desabilita autenticacao de rotas
// router.use("/", controllerConsultas);
// router.use("/", controllerMedicos);
// router.use("/", controllerPacientes);
// router.use("/", controllerPrescricao);

export default router;
