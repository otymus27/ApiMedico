import mongoose, { connect } from "mongoose";

const db = () => {

     console.log("Esperando conectar ao banco de dados!");

     mongoose.connect( process.env.MONGODB_URI)     
     .then(() =>console.log("Conectado ao banco de dados!"))
     .catch(error => console.log(error));
     
}        

export default db;