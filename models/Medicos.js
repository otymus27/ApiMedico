import { mongoose } from "mongoose";

const Schema = mongoose.Schema;

const medicoSchema = new Schema({
 
  nome: {
    type: String,
    required: [true, "Campo obrigatório."],
  },

  login: {
    type: String,
    required: [true, "Campo obrigatório."],
    unique: true,
  },

  senha: {
    type: String,
    required: [true, "Campo obrigatório."]
  },
  
  crm: {
     type: String,
     required: [true, "Campo obrigatório."],
     unique: true
  },

  especialidade: {
     type: String,
     required: [true, "Campo obrigatório."]
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const medico = mongoose.model("Medico", medicoSchema);

export default medico;
