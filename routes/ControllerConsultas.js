import express from "express";
import consultaService from "../services/ServicesConsultas.js";

let router = express.Router();

//GET - listar todos registros
router.get('/consultas',async(req, res)=> {
     try {
          const consultas = await consultaService.listar();
          res.send(consultas);
     } catch (error) {
          console.log(error);
          res.status(500).send(error);
     }
})

// GET - listar por id
router.get('/consultas/:id',async(req, res)=> {
     const {id} = req.params;
     try {
          const consultas = await consultaService.buscarPorId(id);
          res.send(consultas);
     } catch (error) {
          console.log(error);
          res.status(500).send(error);
     }
})

//POST - cadastrar um registro
router.post('/consultas/',async(req, res)=> {
     const {data, medicoId, pacienteId} = req.body;
     try {
          const consultas = await consultaService.cadastrar({data, medicoId, pacienteId});
          res.send(consultas);
     } catch (error) {
          console.log(error);
          res.status(500).send(error);
     }
})

//PUT - alterar todos registros
router.put('/consultas/:id',async(req, res)=> {
     const {id} = req.params;
     const {data, medicoId, pacienteId} = req.body;
     try {
          const consultas = await consultaService.alterar(id, {data, medicoId, pacienteId});
          res.send(consultas);
     } catch (error) {
          console.log(error);
          res.status(500).send(error);
     }
})

//DELETE - excluir um registro
router.delete('/consultas/:id',async(req, res)=> {
     const {id} = req.params;
     
     try {
          const consultas = await consultaService.excluir({_id:id});
          res.send(consultas);
     } catch (error) {
          console.log(error);
          res.status(500).send(error);
     }
})

//alterando apenas um campo, exemplo: data da consulta
router.put('/remarcar/:id', async(req, res)=> {
     const {id} = req.params;//parametro da requisição
     const {data} = req.body;//parametro um atributo para requisição
     
     try {
          let consultas = await consultaService.buscarPorId(id);
          consultas.data = data;//atribuir o parametro o valor da requisicao
          consultas = await consultaService.alterar(id, {data});
          res.send(consultas);
     } catch (error) {
          console.log(error);
          res.status(500).send(error);
     }
} )

export default router;