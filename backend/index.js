const express = require('express');
const app = express();
const nodeStart = require('./src/config/nodeStart');
const bodyParser = require('body-parser');
const SHA1 = require('./src/api/SHA1');

 
const usuario = require('./src/api/usuario');
const campanha = require('./src/api/campanha');
const evento = require('./src/api/evento');
const telemarketing = require('./src/api/telemarketing');
const pessoa = require('./src/api/pessoa');
const atividade = require('./src/api/atividade');
const produtividade = require('./src/api/produtividade');
const tabelaPrecos = require('./src/api/tabelasPrecos');
const importar = require('./src/api/importaLead');
const proposta = require('./src/api/proposta');
const config = require('./src/api/config');
const exportaSQL = require('./src/api/exportaSQL');
const tarefa = require('./src/api/tarefa');
const ranks = require('./src/api/ranks');
const departamentos = require('./src/api/departamento');
const consultaPlaca = require('./src/api/consultaPlaca');
const canais = require('./src/api/canais');
const motivos = require('./src/api/motivos');
const questionarios = require('./src/api/questionarios');
const questPerguntas = require('./src/api/questionariosPerguntas');
const questAlternativas = require('./src/api/questionariosAlternativas');
const pausa = require('./src/api/pausa');
const tipoDeClientes = require('./src/api/tipoDeClientes');
const tipoDeRelacionamentos = require( './src/api/tipoDeRelacionamentos');
const classificacaoDeClientes = require('./src/api/classsificacaoClientes');
const objecao = require('./src/api/objecao');
const motor = require('./src/api/motor');
const apiSGA = require('./src/api/apiSGA');
const parametroInterage = require('./src/api/parametrosInterage');
const upDownFiles = require('./src/api/upDownFiles')
const emailTemplate = require('./src/api/emailTemplate')

//EmailTemplate
declaraServico('getEmailTemplate', emailTemplate.getEmailTemplate)
declaraServico('getByIdEmailTemplate', emailTemplate.getByIdEmailTemplate)
declaraServicoPost('postEmailTemplate', emailTemplate.postEmailTemplate)
declaraServicoPost('postByIdEmailTemplate', emailTemplate.postByIdEmailTemplate)

//upDownFiles 
declaraServico('getFiles', upDownFiles.getFiles)
declaraServicoPost('postFiles', upDownFiles.postFiles)

//integração com SGA
declaraServico('buscaPessoa', apiSGA.buscaPessoa );
declaraServico('getVeiculo', apiSGA.getVeiculo );
declaraServico('getBoletos', apiSGA.getBoletos);
declaraServico('getAssociado', apiSGA.getAssociado);


//proposta
//declaraServico('salvarProposta', proposta.salvarProposta);
declaraServicoPost('salvarProposta', proposta.salvarProposta);
declaraServico('consultarPlaca', consultaPlaca.consultarPlaca);
declaraServico('getPropostasDoUsuario', proposta.getPropostasDoUsuario);
declaraServico('getPropostaPorId', proposta.getPropostaPorId);
declaraServico('getPropostaFiltros', proposta.getPropostaFiltros);
declaraServico('salvarDadosVeiculoDaProposta', proposta.salvarDadosVeiculoDaProposta);
declaraServico('getPropostasPorPeriodoSintetico', proposta.getPropostasPorPeriodoSintetico);
declaraServico('getTabelaPrecos', tabelaPrecos.getTabelaPrecos);

//evento
declaraServico('getEventoFiltros', evento.getEventoFiltros);
declaraServico('getEventosFiltrados', evento.getEventosFiltrados);
declaraServico('getCountEventosPendentes', evento.getCountEventosPendentes);
declaraServico('getEventosPorPeriodoSintetico', evento.getEventosPorPeriodoSintetico);
declaraServico('getEventoPorId', evento.getEventoPorId);
declaraServico('visualizarEvento', evento.visualizarEvento);
declaraServico('informacoesParaCriarEvento', evento.informacoesParaCriarEvento);
declaraServico('encaminhaEvento', evento.encaminhaEvento);
declaraServico('criarEvento', evento.criarEvento);
declaraServico('getTarefaPorId', tarefa.getTarefaPorId);
declaraServico('getTarefaPerformance', tarefa.getTarefaPerformance);
declaraServico('salvarEvento', evento.salvarEvento);
declaraServico('getEventosPendentes', evento.getEventosPendentes);
declaraServico('getEventosLinhaDoTempo', evento.getEventosLinhaDoTempo);
declaraServico('getEventosRelatorioUsuario', evento.getEventosRelatorioUsuario);
declaraServico('getIdEvento', evento.getIdEvento);
declaraServico('getEventosTelefone', evento.getEventosTelefone);
declaraServico('getInformacaoAtendimentos', evento.getInformacaoAtendimentos);
declaraServico('getEventosBoletosPagos', evento.getEventosBoletosPagos);




//motivos
declaraServico('getMotivos', motivos.getMotivos);
declaraServico('crudMotivos', motivos.crudMotivos);
declaraServico('getCanaisMotivoSeleconado', motivos.getCanaisMotivoSeleconado);
declaraServico('salvarCanaisDoMotivo', motivos.salvarCanaisDoMotivo);
declaraServico('getRespostasMotivoSeleconado', motivos.getRespostasMotivoSeleconado);
declaraServico('crudRespostasMotivo', motivos.crudRespostasMotivo);
declaraServico('getMotivosRespostasAutomaticas', motivos.getMotivosRespostasAutomaticas);
declaraServico('crudMotivosRespostasAutomaticas', motivos.crudMotivosRespostasAutomaticas);
declaraServico('getCanaisMotivos', motivos.getCanaisMotivos);

declaraServico('getConfiguracao', config.getConfiguracao);
declaraServico('getSQLs', exportaSQL.getSQLs);
declaraServico('getResultadoSQLs', exportaSQL.getResultadoSQLs);
declaraServico('getSQL', exportaSQL.getSQL);
declaraServico('getRanks', ranks.getRanks);
declaraServicoPost('importaLead', importar.importaLead);

// campanha telemarketing
declaraServico('getCampanhasTelemarketingAtivas', campanha.getCampanhasTelemarketingAtivas);
declaraServico('getCampanhaTelemarketingAnalisar', campanha.getCampanhaTelemarketingAnalisar);
declaraServico('getLigacaoTelemarketing', telemarketing.getLigacaoTelemarketing);
declaraServico('getCampanhaFollowDoUsuario', campanha.getCampanhaFollowDoUsuario);
declaraServico('getDetalheCampanha', campanha.getDetalheCampanha);
declaraServico('getCampanhasDoUsuario', campanha.getCampanhasDoUsuario);
declaraServico('getCampanhasUsuarioSeleconado', campanha.getCampanhasUsuarioSeleconado);
declaraServico('getUsuariosCampanhaSelecionada', campanha.getUsuariosCampanhaSelecionada);
declaraServico('salvarUsuariosDaCampanha', campanha.salvarUsuariosDaCampanha);
declaraServico('getCampanhas', campanha.getCampanhas);
declaraServico('getCampanhaAnalisar', campanha.getCampanhaAnalisar);
declaraServico('salvarCampanhasDoUsuario', campanha.salvarCampanhasDoUsuario);
declaraServico('getEventosRelatorioCampanha', campanha.getEventosRelatorioCampanha);
declaraServico('getQuestRespAnalitica', campanha.getQuestRespAnalitica);
declaraServico('getProdutividadeCallCenter', produtividade.getProdutividadeCallCenter);
declaraServico('crudCampanha', campanha.crudCampanha);

//Departamento
declaraServico('getDepartamentos', departamentos.getDepartamentos);
declaraServico('getDepartamentosUsuarios', departamentos.getDepartamentosUsuarios);
declaraServico('getPermissoesDepartamentoSeleconado', departamentos.getPermissoesDepartamentoSeleconado);
declaraServico('salvarPermissoesDoDepartamento', departamentos.salvarPermissoesDoDepartamento);
declaraServico('salvarUsuariosDoDepartamento', departamentos.salvarUsuariosDoDepartamento);

// usuários
declaraServico('login', usuario.login);
declaraServico('getLogin', usuario.getLogin);
declaraServico('getUsuarios', usuario.getUsuarios);
declaraServico('salvarUsuario', usuario.salvarUsuario);
declaraServico('excluirUsuario', usuario.excluirUsuario);
declaraServico('getAtividades', atividade.getAtividades);
declaraServico('logout', usuario.logout);
declaraServico('trocarSenhaUsuarioLogado', usuario.trocarSenhaUsuarioLogado);
declaraServico('adicionarUsuario', usuario.adicionarUsuario);
declaraServico('getPermissoesUsuarioSeleconado', usuario.getPermissoesUsuarioSeleconado);
declaraServico('salvarPermissoesDoUsuario', usuario.salvarPermissoesDoUsuario);
declaraServico('getAgentesVendas', usuario.getAgentesVendas);
declaraServico('getcarteiraUsuarioSeleconado', usuario.getcarteiraUsuarioSeleconado);

// pessoa
declaraServico('salvarPessoa', pessoa.salvarPessoa);
declaraServico('getTipoTelefone', pessoa.getTipoTelefone);
declaraServico('getTratamentoPessoaFisica', pessoa.getTratamentoPessoaFisica);
declaraServico('salvarTelefonePessoa', pessoa.salvarTelefonePessoa);
declaraServico('excluirTelefonePessoa', pessoa.excluirTelefonePessoa);
declaraServico('salvarEnderecoPessoa', pessoa.salvarEnderecoPessoa);
declaraServico('excluirEnderecoPessoa', pessoa.excluirEnderecoPessoa);
declaraServico('pesquisaPessoas', pessoa.pesquisaPessoas);
declaraServico('editaTelefonePrincipal', pessoa.editaTelefonePrincipal);
declaraServico('editaEnderecoDeCorrespondencia', pessoa.editaEnderecoDeCorrespondencia);
declaraServico('adicionarPessoa', pessoa.adicionarPessoa);
declaraServico('getTipoRelacionamentos', pessoa.getTipoRelacionamentos);
declaraServico('getPessoaPorCPFCNPJ', pessoa.getPessoaPorCPFCNPJ);
declaraServico('getPessoa', pessoa.getPessoa);
declaraServico('crudRelacionamento', pessoa.crudRelacionamento);
declaraServico('getQuestariosPessoaId', pessoa.getQuestariosPessoaId);
declaraServico('getQuestRespAnaliticaPessoaId', pessoa.getQuestRespAnaliticaPessoaId);
declaraServico('getPessoaDadosPrincipais', pessoa.getPessoaDadosPrincipais);
declaraServico('getPessoasDoTelefone', pessoa.getPessoasDoTelefone);
declaraServico('getPessoasEventosDoTelefone', pessoa.getPessoasEventosDoTelefone);
declaraServico('adicionarPessoaAtendimento', pessoa.adicionarPessoaAtendimento);

// questionario
declaraServico('getQuestionarios', questionarios.getQuestionarios);
declaraServico('addQuestionario', questionarios.addQuestionario);
declaraServico('updateQuestionario', questionarios.updateQuestionario);
declaraServico('deleteQuestionario', questionarios.deleteQuestionario);
declaraServico('updateStatusQuestionario', questionarios.updateStatusQuestionario);
declaraServico('getQuestionarioById', questionarios.getQuestionarioById);
declaraServico('getPerguntasByIdUqestionario', questionarios.getPerguntasByIdUqestionario);
declaraServico('getQuestionarioCompletoById', questionarios.getQuestionarioCompletoById);
declaraServico('gravaRespostaQuestionario', questionarios.gravaRespostaQuestionario);
// questtionario alternativas
declaraServico('getAlternativas', questAlternativas.getAlternativas);
declaraServico('getAlternativaById', questAlternativas.getAlternativaById);
declaraServico('addAlternativa', questAlternativas.addAlternativa);
declaraServico('updateStatusAlternativa', questAlternativas.updateStatusAlternativa);
declaraServico('deleteAlternativa', questAlternativas.deleteAlternativa);
declaraServico('updateAlternativa', questAlternativas.updateAlternativa);
// questtionario perguntas
declaraServico('getPerguntas', questPerguntas.getPerguntas);
declaraServico('addPergunta', questPerguntas.addPergunta);
declaraServico('updatePergunta', questPerguntas.updatePergunta);
declaraServico('updateStatusPergunta', questPerguntas.updateStatusPergunta);
declaraServico('deletePergunta', questPerguntas.deletePergunta);
declaraServico('updateStatusPergunta', questPerguntas.updateStatusPergunta);
declaraServico('updateMultiEscolhaPergunta', questPerguntas.updateMultiEscolhaPergunta);
declaraServico('getPerguntaById', questPerguntas.getPerguntaById);
declaraServico('getAlternativasByIdPerguntas', questPerguntas.getAlternativasByIdPerguntas);
// pausa
declaraServico('getPausas', pausa.getPausas);
declaraServico('crudPausa', pausa.crudPausa);
declaraServico('registrarFimPausa', pausa.registrarFimPausa);
declaraServico('registrarInicioPausa', pausa.registrarInicioPausa);
// tipo de clientes
declaraServico('getTipoClientes', tipoDeClientes.getTipoClientes);
declaraServico('crudTipoClientes', tipoDeClientes.crudTipoClientes);

// tipo de Relacionamentos
declaraServico('getTipoRelacionamentosCon', tipoDeRelacionamentos.getTipoRelacionamentosCon);
declaraServico('crudTipoRelacionamentos', tipoDeRelacionamentos.crudTipoRelacionamentos);
declaraServico('getRelacionamentosVolta', tipoDeRelacionamentos.getRelacionamentosVolta);
declaraServico('salvarRelacionamentoVolta', tipoDeRelacionamentos.salvarRelacionamentoVolta);

// classificação de clientes
declaraServico('getClassificacaoClientes', classificacaoDeClientes.getClassificacaoClientes);
declaraServico('crudClassificacaoClientes', classificacaoDeClientes.crudClassificacaoClientes);

// Objeções
declaraServico('getObjecao', objecao.getObjecao);
declaraServico('crudObjecao', objecao.crudObjecao);

//canais
declaraServico('getCanais', canais.getCanais);
declaraServico('crudCanais', canais.crudCanais);

//parâmetros do Interage
declaraServico('setParametrosInterages', parametroInterage.setParametrosInterages);
declaraServico('getParametrosInterage', parametroInterage.getParametrosInterage);

 
app.listen(nodeStart.port, "0.0.0.0");

console.log(`Servidor iniciado na em http://localhost:${nodeStart.port}`)


function declaraServico(nomeServico, funcao) {
  app.get(`/${nomeServico}`, (req, res) => {
    funcao(req)
      .then(linhas => {
        headerResponse(res)
        res.status(200).send(linhas)
      })
      .catch(error => {
        headerResponse(res)
        console.log(`Serviço: ${nomeServico}; Resultado: `, error)
        res.status(401).send(error)
      });
  });
  console.log(`Serviço GET ${nomeServico}, declarado com sucesso!`)
}


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));

// app.post('/teste5', (req, res) =>{
//   console.log(' req 5 ', req.body)
//   res.status(200).send('teste realizado 10')
// })


function declaraServicoPost(nomeServico, funcao ) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
  app.use(allowCrossDomain);

  app.post(`/${nomeServico}`, (req, res) =>{
    funcao(req)
      .then(linhas => {
        headerResponse(res)
        res.status(200).send(linhas)
      })
      .catch(error => {
        headerResponse(res)
        console.log(`Serviço: ${nomeServico}; Resultado: `, error)
        res.status(401).send(error)
      })
  })
  console.log(`Serviço POST ${nomeServico}, declarado com sucesso!`)
}









function headerResponse(res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.set("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, cache-control");
}

var timeMotor = async function ()  {

  var req = {
      query: {
      login: 'interage',
      senha: SHA1.SHA1('crm123!@#'),
      id_usuario: 1,
      token: ''
      }
  };
  var res = '';
  
  await  usuario.login(req, res)
  .then ( res => {
    req.query.token = res.token;
  });


  console.log('Horário que o motor funcionou => ', Date());

  // motor.criaEventosDeRegras();


  await motor.criaEventosDeCobrancaSGA(req); 

  await motor.encerraEventosDeCobrancaSGA(req); 

  await motor.criaEventosDePosVendaSGA(req);

  setTimeout(timeMotor, 1800000);

}



// timeMotor();



