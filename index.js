import express from "express";
import pkg from "body-parser";
import router from "./routes/router.js"
import db from "./database/database.js";
import cors from "cors";//compartilhamento de recursos diferentes entre o frontend com backend !!!muito importante!!!


const app = express();
const { json, urlencoded }  = pkg;

app.use(json());
app.use(urlencoded({extended: true}));
app.use(cors());//usamos aqui para liberar segurança da aplicação

//aqui escutamos a porta 3000
app.listen(3001, function () {
  console.log("Rodando da porta 3001");
});

app.use("/", router); //aqui usa a barra como página inicial como mapeamento puxando do router que terá as páginas
