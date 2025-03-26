// Importar módulo responsável pela comunicação com o banco de dados
import ConsultaService from "../services/ServicesConsultas.js";

// Função para cadastrar registros
const create = async (req, res) => {
  try {
    //Receber os dados de um formulário e desmembrar os dados
    const { data, medicoId, pacienteId } = req.body;

    // Validar dados
    if (!data || !medicoId || !pacienteId) {
      res.status(400).send({ message: "Preencher todos os campos!" });
    }

    // Aqui chamamos o service para cadastrar o registro no banco de dados
    const consulta = await ConsultaService.create(req.body);

    if (!consulta) {
      return res.status(400).send({ message: "Erro no controller - Erro ao criar registro!" });
    }

    // Resposta para o cliente
    res.status(201).send({
      consulta: {
        id: consulta._id,
        data,
        medicoId,
        pacienteId,                       
      },
      message: "Registro criado com sucesso!",
    });
  } catch (error) {    
      console.error("Erro no controller ao cadastrar registro:", error.message);
      res.status(error.status || 500).json({ message: error.message });
  }
};

// Função para leitura de registros
const listar = async (req, res) => {
    try {      
        const { page = 1, limit = 10 } = req.query;
        
        // Variável para receber um conjunto de registros ou array
        const consultas = await ConsultaService.listarPaginado(page, limit);
        

        if (consultas.length === 0) {
            return res.status(400).send({ message: "Erro no controller - Nenhum registro na lista!" });
        }

        // Resposta para o cliente
        res.status(200).send(consultas);
    } catch (error) {
        return res.status(500).send("Erro no controller: "+error.message);
    }
};

// Função para buscar registros por ID
const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o ID foi fornecido
    if (!id) {
      return res.status(400).json({ erro: "ID do paciente é obrigatório!" });
    }

    const consulta = await ConsultaService.buscarPorId(id);

    // Se não encontrar o paciente, retorna 404
    if (!consulta) {
      return res.status(404).json({ erro: "Paciente não encontrado!" });
    }

    return res.status(200).json(consulta);
  } catch (error) {
    console.error("Erro no controller:", error);
    return res.status(500).json({ erro: "Erro interno no servidor" });
  }
};

// Função para excluir registros por ID
const excluir = async (req, res) => {
  try {
    // Aqui passamos o parâmetro para rota
    const id = req.params.id;

    // Aqui chamamos o service para buscarPorId o registro no banco de dados, passando o id 
    const resultado = await ConsultaService.buscarPorId(id);

    // Verificar se existe algum registro vindo do banco de dados
    if (!resultado) {
      return res.status(400).send({ message: "Nenhum registro cadastrado!" });
    }

    // Variável para receber a resposta vinda do service, além de passarmos o parâmetro para função
    const consulta = await ConsultaService.excluir(id);

    // Resposta para o cliente
    res.status(200).send({ message: "Registro excluido com sucesso!" });
  } catch (error) {
    return res.status(500).send("Erro no controller excluir: "+error.message);
  }
};

// Função para editar registros
const editar = async (req, res) => {
    try {
        //Receber os dados de um formulário e desmembrar os dados
        const { data, medicoId, pacienteId } = req.body;

        // Aqui passamos o parâmetro para rota
        const id = req.params.id;

        // Aqui chamamos o service para buscarPorId o registro no banco de dados, passando o id
        const consulta = await ConsultaService.buscarPorId(id);

        // Aqui chamamos o service para atualizar o registro no banco de dados, passando o id e os dados
        await ConsultaService.editar(id, data, medicoId, pacienteId);

        // Resposta para o cliente
        res.status(200).send({ message: "Registro atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro no Controller:", error.message); // Verificar no console do backend
        res.status(error.status || 500).json({ message: error.message });
    }
};

export default { create, listar, buscarPorId, excluir, editar };
