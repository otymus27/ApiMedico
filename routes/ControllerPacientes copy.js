import express from "express";

import pacienteService from "../services/ServicesPacientes.js";
import paciente from "../models/Pacientes.js";

let router = express.Router();

//GET - listar todos registros
router.get('/pacientes/',async(req, res)=> {    

     try {        
            // Obtem o repositorio da entidade ou model
          const pacientes = await pacienteService.listar();
          //res.send(pacientes);

       
         
          // Receber o número da página e definir página 1 como padrão
          const page = Number(req.query.page) || 1;
          console.log(page)
         
          // Definir o limite de registros por página
          const limite = 1;
          
          // Contar o total de registro do banco de dados. No caso do mongo usar o model.countDocuments() para contar registros
          const totalRegistro = await paciente.countDocuments();
          console.log("total registros",totalRegistro)
          
          //Verificar se existem registros
          if(totalRegistro === 0){
            res.status(400).json({
                message: "Nenhum registro encontrado.",
            })
            return;
          }

          // Calcular a última página
          const ultimaPagina = Math.ceil(totalRegistro / limite);
          
          // Verificar se a página solicitada é válida
          if(page > ultimaPagina){
            res.status(400).json({
                message: `Página inválida. O total de páginas é ${ultimaPagina}`,
            })
            return;
          }
          console.log(ultimaPagina)

          // Calcular o offset( a partir de qual registro começar a busca)
          const offset = (page - 1) * limite;
          //console.log(offset)

          // Retorna os registros como resposta
          res.status(200).json(pacientes);
          return;


     } catch (error) {
          // Retornar erro em caso de falha
            res.status(500).json({
                message: "Erro ao listar registros!",
            });
            return;
     }
})


// GET - listar por id
router.get('/paciente/:id',async(req, res)=> {
     const {id} = req.params;
     try {
          const pacientes = await pacienteService.buscarPorId(id);
          res.send(pacientes);
     } catch (error) {
          console.log(error);
          res.status(500).send(error);
     }
})

//POST - cadastrar um registro
router.post('/pacientes/',async(req, res)=> {
     const {nome, email, telefone} = req.body;
     try {
          const pacientes = await pacienteService.cadastrar({nome, email, telefone});
          res.send(pacientes);
     } catch (error) {
          console.log(error);
          res.status(500).send(error);
     }
})

//PUT - alterar todos registros
router.put('/paciente/:id',async(req, res)=> {
     const {id} = req.params;
     const {nome, email, telefone} = req.body;
     try {
          const pacientes = await pacienteService.alterar(id, {nome, email, telefone});
          res.send(pacientes);
     } catch (error) {
          console.log(error);
          res.status(500).send(error);
     }
})

//DELETE - excluir um registro

router.delete('/paciente/:id',async(req, res)=> {
     const {id} = req.params;
     
     try {
          const pacientes = await pacienteService.excluir({_id:id});
          res.send(pacientes);
     } catch (error) {
          console.log(error);
          res.status(500).send(error);
     }
})

export default router;
