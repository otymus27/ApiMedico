import prescricaoRepository from "../repositories/RepositoryPrescricao.js";
import consultaService from "./ServicesConsultas.js";
import medicoService from "./ServicesMedicos.js";
import pacienteService from "./ServicesPacientes.js";
import PDFDocumento from "pdfkit";
import fs from "fs";

const listar = async () => {
     return prescricaoRepository.listar();
}


const buscarPorId = async (id) => {
     return prescricaoRepository.buscarPorId(id);
}
   
const cadastrar = async ({data, consultaId, medicamento, dosagem, instrucoes}) =>{     
     return prescricaoRepository.cadastrar({data, consultaId, medicamento, dosagem, instrucoes});     
}

const alterar = async (id, {data, consultaId, medicamento, dosagem, instrucoes, file}) =>{     
     return await prescricaoRepository.alterar(id, {data, consultaId, medicamento, dosagem, instrucoes, file});    
}

const excluir = async (id) =>{
     return prescricaoRepository.excluir(id);
}

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
     cadastrar,
     alterar,
     excluir,
     gerarPrescricao
}

export default prescricaoService;