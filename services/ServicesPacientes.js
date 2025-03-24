import pacienteRepository from "../repositories/RepositoryPacientes.js";


// Função para cadastrar registros recebendo os dados através do body
const create = async ({ nome, email, telefone }) => {
  
  // Validar dados 
  if (!nome || !email || !telefone)
    throw new Error("Preencha todos os campos!");
 
  try {
    // Aqui chamamos o repositorio para cadastrar o registro no banco de dados
    return await pacienteRepository.create(
          nome,
          email,
          telefone,       
    );    
    
  } catch (error) {
    if (error.code === 11000) { // Código de erro de chave duplicada no MongoDB
        const campoDuplicado = Object.keys(error.keyPattern)[0];
        const erro = new Error(`O campo '${campoDuplicado}' já está em uso.`);
        erro.status = 409; // Código de conflito
        throw erro;
    }
    throw new Error("Erro ao cadastrar registro.");    
  }   
  
};

// Função para leitura de registros
const listar = async (req, res) => {
  // Variável para receber um conjunto de registros ou array
  const registros = await pacienteRepository.listar();

  if (registros.length === 0) throw new Error("nenhum registro encontrado!");

  // Resposta para o cliente
  return registros;
};

const listarPaginado = async (page = 1, limit = 10) => {
  try {
      const { pacientes, total } = await pacienteRepository.listarPaginado(page, limit);
      return {
          pacientes,
          total,
          page: Number(page),
          limit: Number(limit),
      };
  } catch (error) {
      throw new Error("Erro ao listar registros paginados no service.");
  }
};


// Função para buscar registros por ID
const buscarPorId = async (id) => {
  // Aqui chamamos o repositorio para buscarPorId o registro no banco de dados, passando o id e armazenamos numa variavel
  const registro = await pacienteRepository.buscarPorId(id);

  // Verificar se existe algum registro vindo do banco de dados
  if (!registro) throw new Error("Nenhum registro cadastrado!");  

  // Resposta para o cliente enviando um objeto
  return {
    id: String(registro._id), // Garante que seja uma string
    nome: registro.nome,
    email: registro.email,
    telefone: registro.telefone,        
  };
};
   
// Função para excluir registros por ID
const excluir = async (id) => {
  // Aqui chamamos o repositorio para buscarPorId o registro no banco de dados, passando o id
  const registro = await pacienteRepository.buscarPorId(id);

  if (!registro) throw new Error("Não existe registro com este ID!");

  // if (String(registro.user._id) !== String(userId))
  //   throw new Error("Você não tem permissão para excluir este registro!");
  // // const result =(noticia.user._id !== userId);
  // console.log(result)

  // Aqui chamamos o repositorio para excluir o registro no banco de dados, passando o id e os dados
  await pacienteRepository.excluir(id);
};

// Função para editar registros
const editar = async (id, nome, email, telefone) => {
  // Validar dados
  if (!nome && !email && !telefone)
    throw new Error("Preencha pelo menos um dos campos!");
  
  // Aqui chamamos o repositorio para buscarPorId o registro no banco de dados, passando o id
  const registro = await pacienteRepository.buscarPorId(id);

  // if (noticias.user.id != userId)
  //   throw new Error("Você não tem permissão para editar este registro!");
 
  try {    
      // Aqui chamamos o service para atualizar o registro no banco de dados, passando o id e os dados
      const registroAtualizado = await pacienteRepository.editar(id, nome, email, telefone);
      if(!registroAtualizado){
          const error = new Error("Regiistro não encontrado!");
          error.status = 404;
          throw error;
      }
  } catch (error) {
      if (error.code === 11000) { // Código de erro de chave duplicada no MongoDB
          const campoDuplicado = Object.keys(error.keyPattern)[0];
          const erro = new Error(`O campo '${campoDuplicado}' já está em uso.`);
          erro.status = 409; // Código de conflito
          throw erro;
      }
      throw new Error(error.message || "Erro ao atualizar registro."); 
  }
  
};

const pacienteService = {
     listar,
     buscarPorId,
     create,     
     excluir,
     listarPaginado,
     editar
}

export default pacienteService;