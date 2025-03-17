// Importar módulo responsável pela comunicação com o banco de dados
import MedicoService from "../services/MedicoService.js";

// Função para cadastrar registros
const create = async (req, res) => {
  try {
    //Receber os dados de um formulário e desmembrar os dados
    const { nome, login, senha, crm, especialidade } = req.body;

    // Validar dados
    if (!nome || !login || !senha || !crm || !especialidade) {
      res.status(400).send({ message: "Preencher todos os campos!" });
    }

    // Aqui chamamos o service para cadastrar o registro no banco de dados
    const medico = await MedicoService.create(req.body);

    if (!medico) {
      return res.status(400).send({ message: "Erro ao criar registro!" });
    }

    // Resposta para o cliente
    res.status(201).send({
      medico: {
        id: medico._id,
        nome,
        login,
        senha,
        crm,
        especialidade,
      },
      message: "Registro criado com sucesso!",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Função para leitura de registros
const listar = async (req, res) => {
  try {
    // Variável para receber um conjunto de registros ou array
    const medicos = await MedicoService.listar();

    if (medicos.length === 0) {
      return res.status(400).send({ message: "Nenhum registro cadastrado!" });
    }

    // Resposta para o cliente
    res.status(200).send(medicos);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Função para buscar registros por ID
const buscarPorId = async (req, res) => {
  try {
    // Aqui passamos o parâmetro para rota
    const id = req.params.id;

    // Variável para receber o registro vindo do banco de dados, além de passarmos o parâmetro para função
    const medico = await MedicoService.buscarPorId(id);

    // Resposta para o cliente
    res.status(200).send(medico);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Função para excluir registros por ID
const excluir = async (req, res) => {
  try {
    // Aqui passamos o parâmetro para rota
    const id = req.params.id;

    // Aqui chamamos o service para buscarPorId o registro no banco de dados, passando o id 
    const resultado = await MedicoService.buscarPorId(id);

    // Verificar se existe algum registro vindo do banco de dados
    if (!resultado) {
      return res.status(400).send({ message: "Nenhum registro cadastrado!" });
    }

    // Variável para receber a resposta vinda do service, além de passarmos o parâmetro para função
    const medico = await MedicoService.excluir(id);

    // Resposta para o cliente
    res.status(200).send({ message: "Registro excluido com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Função para editar registros
const editar = async (req, res) => {
  try {
    //Receber os dados de um formulário e desmembrar os dados
    const { nome, login, senha, crm, especialidade } = req.body;

    // Aqui passamos o parâmetro para rota
    const id = req.params.id;

    // Aqui chamamos o service para buscarPorId o registro no banco de dados, passando o id
    const medico = await MedicoService.buscarPorId(id);

    // Aqui chamamos o service para atualizar o registro no banco de dados, passando o id e os dados
    await MedicoService.editar(id, nome, login, senha, crm, especialidade);

    // Resposta para o cliente
    res.status(200).send({ message: "Registro atualizado com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { create, listar, buscarPorId, excluir, editar };
