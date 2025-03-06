import express from "express";
import prescricaoService from "../services/ServicesPrescricao.js";
import multer from "multer"; //é um middleware do Node.js que permite o upload de arquivos em aplicativos Express
import path from "path"; //fornecer funções de tratamento de diretorios
import process from "process"; //ajuda a processar o arquivo que iremos precisar fazer a leitura

let router = express.Router();

//variavel para criar armazenado para upload - aula 10
const storage = multer.diskStorage({
  destino: function (req, arquivo, cb) {
    cb(null, "./AppMedico/prescricao/");
  },

  //cb - função call back

  nomeArquivo: function (req, arquivo, cb) {
    cb(null, arquivo, nomeOriginal);
  },
});

//variavel de upload - aula 10
const upload = multer({ storage: storage });

//Rota para mapear o upload - aula 10
router.post(
  "/uploadPrescricao/:id",
  upload.single("arquivo"),
  async (req, res) => {
    try {
      //aqui pegamos  parametro de id da prescricao atraves da requisicao
      const { id } = req.params;
      //variavel auxiliar para encontrar a prescricao necessaria e devolver na requisicao
      let prescricao = await prescricaoService.buscarPorId(id);

      const arquivo = "./AppMedico/prescricao/" + req.arquivo.nomeOriginal;
      prescricao = await prescricaoService.alterar(id, { arquivo });
      return res.status(200).send(prescricao);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

//Rota para mapeamento de leitura de arquivos - aula 10
router.get('/leituraPrescricao/:id', async(req,res)=>{
     //aqui pegamos  parametro de id da prescricao atraves da requisicao
     const { id } = req.params;     

     try {
          //aqui recuperamos o id do banco de dados
          const prescricao = await prescricaoService.buscarPorId(id);
          let caminhoArquivo = path.resolve(process.cwd() + "../" + prescricao.file);
          //aqui retornamos o caminho do arquivo a ser lido
          res.status(500).sendFile(caminhoArquivo);
     } catch (error) {
          console.log(error);
          res.status(500).send(error);
     }
})



//GET - listar todos registros
router.get("/prescricoes", async (req, res) => {
  try {
    const prescricoes = await prescricaoService.listar();
    res.send(prescricoes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// GET - listar por id
router.get("/prescricoes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const prescricoes = await prescricaoService.buscarPorId(id);
    res.send(prescricoes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//POST - cadastrar um registro
router.post("/prescricoes/", async (req, res) => {
  const { data, consultaId, medicamento, dosagem, instrucoes } = req.body;
  try {
    const prescricoes = await prescricaoService.cadastrar({
      data,
      consultaId,
      medicamento,
      dosagem,
      instrucoes,
    });
    res.send(prescricoes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//PUT - alterar todos registros
router.put("/prescricoes/:id", async (req, res) => {
  const { id } = req.params;
  const { data, consultaId, medicamento, dosagem, instrucoes } = req.body;
  try {
    const prescricoes = await prescricaoService.alterar(id, {
      data,
      consultaId,
      medicamento,
      dosagem,
      instrucoes,
    });
    res.send(prescricoes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//DELETE - excluir um registro
router.delete("/prescricoes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const prescricoes = await prescricaoService.excluir({ _id: id });
    res.send(prescricoes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//Rota para gerar um arquivo
router.get("gerarPrescricao/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const prescricao = await prescricaoService.buscarPorId(id);
    const gerarPrescricao = await prescricaoService.gerarPrescricao(prescricao);
    res.send(gerarPrescricao);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
