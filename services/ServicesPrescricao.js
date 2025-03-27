import prescricaoRepository from "../repositories/RepositoryPrescricao.js";
import consultaService from "./ServicesConsultas.js";
import medicoService from "./ServicesMedicos.js";
import pacienteService from "./ServicesPacientes.js";
import PDFDocumento from "pdfkit";
import fs from "fs";

// Função para cadastrar registros recebendo os dados através do body
const create = async ({data, consultaId, medicamento, dosagem, instrucoes}) => {
  
     // Validar dados 
     if  (!data ||!consultaId || !medicamento || !dosagem || !instrucoes ) {
          throw new Error('Todos os campos são obrigatórios');
     }     
     
     // Aqui chamamos o repositorio para cadastrar o registro no banco de dados
     return await prescricaoRepository.create( data, consultaId, medicamento, dosagem, instrucoes );    
};


// Função para leitura de registros
const listar = async (req, res) => {
     // Variável para receber um conjunto de registros ou array
     const registros = await prescricaoRepository.listar();

     if (registros.length === 0) throw new Error("nenhum registro encontrado!");

     // Resposta para o cliente
     return registros;
};

const listarPaginado = async (page = 1, limit = 10) => {
  try {
      const { prescricoes, total } = await prescricaoRepository.listarPaginado(page, limit);
      return {
          prescricoes,
          total,
          page: Number(page),
          limit: Number(limit),
      };
  } catch (error) {
      throw new Error("Erro ao processar os dados no serviço.");
  }
};

// Função para buscar registros por ID
const buscarPorId = async (id) => {
     // Aqui chamamos o repositorio para buscarPorId o registro no banco de dados, passando o id e armazenamos numa variavel
     const registro = await prescricaoRepository.buscarPorId(id);

     // Verificar se existe algum registro vindo do banco de dados
     if (!registro) throw new Error("Nenhum registro cadastrado!");  

     // Resposta para o cliente enviando um objeto
     return {          
          id: String(registro._id), // Garante que seja uma string
          data: registro.data,
          consultaId: registro.consultaId,
          medicamento: registro.medicamento,
          dosagem: registro.dosagem,
          instrucoes: registro.instrucoes,                
     };
};


// Função para editar registros
const editar = async (id, data, consultaId, medicamento, dosagem, instrucoes, file) => {
     // Validar dados
     if (!data && !consultaId && !medicamento && !dosagem && !instrucoes)
     throw new Error("Preencha pelo menos um dos campos!");
     
     // Aqui chamamos o repositorio para buscarPorId o registro no banco de dados, passando o id
     const registro = await prescricaoRepository.buscarPorId(id);

     // if (noticias.user.id != userId)
     //   throw new Error("Você não tem permissão para editar este registro!"); 

     try {    
          // Aqui chamamos o service para atualizar o registro no banco de dados, passando o id e os dados
          const registroAtualizado = await prescricaoRepository.editar(id, data, consultaId, medicamento, dosagem, instrucoes, file);
          if(!registroAtualizado){
               const error = new Error("Registro não encontrado!");
               error.status = 404;
               throw error;
          }
     } catch (error) {
          if (error.code === 11000) { // Código de erro de chave duplicada no MongoDB
               const campoDuplicado = Object.keys(error.keyPattern)[0];
               const erro = new Error(`O campo '${campoDuplicado}' já está em uso.`);
               erro.status = 409; // Código de conflito
               throw erro;
          }
          throw new Error(error.message || "Erro ao atualizar registro."); 
     }  
};

// Função para excluir registros por ID
const excluir = async (id) => {
  // Aqui chamamos o repositorio para buscarPorId o registro no banco de dados, passando o id
  const registro = await prescricaoRepository.buscarPorId(id);

  if (!registro) throw new Error("Não existe registro com este ID!");

  // if (String(registro.user._id) !== String(userId))
  //   throw new Error("Você não tem permissão para excluir este registro!");
  // // const result =(noticia.user._id !== userId);
  // console.log(result)

  // Aqui chamamos o repositorio para excluir o registro no banco de dados, passando o id e os dados
  await prescricaoRepository.excluir(id);
};

//função para gerar o arquivo da receita medica
const gerarPrescricao = async(prescricao) => {
     const consulta = await consultaService.buscarPorId(prescricao.consultaId);
     const paciente = await pacienteService.buscarPorId(consulta.pacienteId);
     const medico = await medicoService.buscarPorId(consulta.medicoId);

     const id = prescricao._id;
     const documento = new PDFDocumento({font: 'Courier'});
     const caminho = "./AppMedico/prescricao/"+id+".pdf";

     documento.pipe(fs.creatoWriteStream(caminho));
     documento.fontSize(16).text("Nome do Paciente: " + paciente.nome);
     documento.fontSize(16).text("Nome do Médico: " + medico.nome);

     const receita = "Medicamento:  "+ prescricao.medicamento;
     documento.fontSize(12).text(receita);
     documento.fontSize(12).text("Dose: " + prescricao.dosagem);
     documento.fontSize(12).text("Instruções: " + prescricao.instrucoes);

     documento.end();

     return prescricao;
}


const prescricaoService = {
     listar,
     buscarPorId,
     create,
     editar,
     excluir,
     gerarPrescricao,
     listarPaginado
}

export default prescricaoService;