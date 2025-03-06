import mongoose from 'mongoose';
import bcrypt from 'bcrypt';



const MedicoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  crm: {
    type: String,
    required: true,
    unique: true,
  },
  especialidade: {
    type: String,
    required: true,
  },  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Aqui é feita a criptografia da senha
MedicoSchema.pre('save', async function (next) {
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
})

const Medico = mongoose.model('Medico', MedicoSchema);

export default Medico;