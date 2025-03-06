import express from "express";
import medicoService from "../services/ServicesMedicos.js";
import bcrypt from "bcrypt";

let router = express.Router();

//GET - listar todos registros
router.get('/medicos',async(req, res)=> {
     try {
          const medicos = await medicoService.listar();
          res.send(medicos);
     } catch (error) {
          console.log(error);
          res.status(500).send('erro ao listar'+error);
     }
})

// GET - listar por id
router.get('/medico/:id', async(req, res) => {
     const {id} = req.params;
     try {          
          const medicos = await medicoService.buscarPorId(id);
          res.send(medicos);
     } catch (error) {
          console.log(error);
          res.status(500).send(error);
     }
})

//POST - cadastrar um registro
router.post('/medicos/',async(req, res)=> {
     const {nome, login, senha, crm, especialidade} = req.body;
     try {
          const senhaCodificada = await bcrypt.hash(senha, 10);
          const medicos = await medicoService.cadastrar({nome, login, senha: senhaCodificada, crm, especialidade});
          res.send(medicos);
     } catch (error) {
          console.log(error);
          res.status(500).send("Erro ao cadastrar!" + error);
     }
})

//PUT - alterar todos registros
router.put('/medicos/:id',async(req, res)=> {
     //recebendo os dados enviados no corpo da requisição
     const {id} = req.params;
     const {nome, login, senha, crm, especialidade} = req.body;
     try {
          const medicos = await medicoService.alterar(id, {nome, login, senha, crm, especialidade});
          res.send(medicos);
     } catch (error) {
          console.log(error);
          res.status(500).send(error);
     }
})

//DELETE - excluir um registro
router.delete('/medico/:id',async(req, res)=> {
     const {id} = req.params;   
     
     try {
          const medicos = await medicoService.excluir({_id:id});
          res.send(medicos);
     } catch (error) {
          console.log(error);
          res.status(500).send(error);
     }
})



export default router;
