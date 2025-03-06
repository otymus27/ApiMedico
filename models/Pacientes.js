import { mongoose } from "mongoose";

const Schema = mongoose.Schema;

const pacienteSchema = new Schema (
     {          
          nome: {
               type: String,
               required: [true, "Campo obrigatório."],
          },
          
          email: {
               type: String,
               required: [true, "Campo obrigatório."],
               unique: true,
          },
          
          telefone: {
               type: String,
               required: [true, "Campo obrigatório."],

               //validação de dados
               validate: {
                    validator: function (v) {
                         return /\d{2} 9\d{4}-\d{4}/.test(v);//61 99602-3333
                    },
                    message: props =>
                         `${props.value} Esse valor não é válido. Por favor, informe uma entrada no formato válido!!! `
               }
          },

          createdAt: {
               type: Date,
               default: Date.now
          }
     }     
);

const paciente = mongoose.model('Paciente', pacienteSchema);

export default paciente;