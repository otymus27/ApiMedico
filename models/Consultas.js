import { mongoose } from "mongoose";
import Pacientes  from "../models/Pacientes.js";
import Medicos  from "../models/Medicos.js";

const Schema = mongoose.Schema;

const consultaSchema = new Schema (
     {
          data: {
               type: Date,
               required: [true, 'Campo obrigatório.']
          },
          medicoId: {
               type: String,
               required: [true, 'MedicoId é obrigatório.'],

               //validação de dados
               validate: {
                    validator: async function (v) {
                         const id = new mongoose.Types.ObjectId(v); //convertendo uma string em objeto ID para ser encontrado no bando de dados
                         return await Medicos.exists({_id:id});
                    },
                    message: props =>
                         `medicoId ${props.value} - Chave primária não encontrada!!! `
               }
          },
          pacienteId: {
               type: String,
               required: [true, 'PacienteId é obrigatório.'],

               //validação de dados
               validate: {
                    validator: async function (v) {
                         const id = new mongoose.Types.ObjectId(v); //convertendo uma string em objeto ID para ser encontrado no bando de dados
                         return await Pacientes.exists({_id:id});
                    },
                    message: props =>
                         `pacienteId ${props.value} - Chave primária não encontrada!!! `
               }
          },
          createdAt: {
               type: Date,
               default: Date.now
          }
     }     
);

const consulta = mongoose.model('Consulta', consultaSchema);

export default consulta;