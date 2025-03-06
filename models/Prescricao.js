import { mongoose } from "mongoose";

const Schema = mongoose.Schema;

const consultaSchema = new Schema ({
    data: {
        type: Date
    },
    consultaId: {
        type: String,
        required: [true, 'Campo obrigatorio.']
    },
    medicamento: {
        type: String,
        required: [true, 'Campo obrigatorio.']
    },
    dosagem: {
        type: String,
        required: [true, 'Campo obrigatorio.']
    },
    instrucoes: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    //atributo de arquivo, para guardar historico de arquivos
    file: {
        type: String
    }
}
);

const prescricao = mongoose.model('Prescricao', consultaSchema);

export default prescricao;