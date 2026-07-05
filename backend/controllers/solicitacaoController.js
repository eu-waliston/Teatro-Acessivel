const Solicitacao = require('../models/Solicitacao');
const Espetaculo = require('../models/Espetaculo');

// POST /api/solicitacoes
const criarSolicitacao = async (req, res, next) => {
  try {
    const espetaculo = await Espetaculo.findById(req.body.espetaculo);
    if (!espetaculo) {
      return res.status(404).json({ sucesso: false, mensagem: 'Espetáculo informado não existe' });
    }

    const solicitacao = await Solicitacao.create(req.body);
    res.status(201).json({ sucesso: true, dados: solicitacao });
  } catch (erro) {
    next(erro);
  }
};

// GET /api/solicitacoes  (uso interno da equipe organizadora)
// Suporta filtros: ?espetaculo=id, ?status=pendente
const listarSolicitacoes = async (req, res, next) => {
  try {
    const filtro = {};
    if (req.query.espetaculo) filtro.espetaculo = req.query.espetaculo;
    if (req.query.status) filtro.status = req.query.status;

    const solicitacoes = await Solicitacao.find(filtro)
      .populate('espetaculo', 'nome data horario')
      .sort({ createdAt: -1 });

    res.json({ sucesso: true, total: solicitacoes.length, dados: solicitacoes });
  } catch (erro) {
    next(erro);
  }
};

// GET /api/solicitacoes/indicadores
// Gera indicadores agregados sobre as demandas de acessibilidade (apoio ao planejamento)
const indicadoresSolicitacoes = async (req, res, next) => {
  try {
    const filtro = {};
    if (req.query.espetaculo) filtro.espetaculo = req.query.espetaculo;

    const solicitacoes = await Solicitacao.find(filtro);
    const total = solicitacoes.length;

    const camposRecursos = [
      'interpreteLibras',
      'audiodescricao',
      'espacoCadeiraDeRodas',
      'apoioMobilidade',
      'acompanhamentoEquipe',
      'espacoCaoGuia'
    ];

    const contagemRecursos = camposRecursos.reduce((acc, campo) => {
      acc[campo] = solicitacoes.filter((s) => s.recursos && s.recursos[campo]).length;
      return acc;
    }, {});

    const totalAcompanhantes = solicitacoes.reduce((soma, s) => soma + (s.quantidadeAcompanhantes || 0), 0);

    const porStatus = solicitacoes.reduce((acc, s) => {
      acc[s.status] = (acc[s.status] || 0) + 1;
      return acc;
    }, {});

    res.json({
      sucesso: true,
      dados: { total, contagemRecursos, totalAcompanhantes, porStatus }
    });
  } catch (erro) {
    next(erro);
  }
};

// GET /api/solicitacoes/:id
const obterSolicitacao = async (req, res, next) => {
  try {
    const solicitacao = await Solicitacao.findById(req.params.id).populate('espetaculo', 'nome data horario');
    if (!solicitacao) {
      return res.status(404).json({ sucesso: false, mensagem: 'Solicitação não encontrada' });
    }
    res.json({ sucesso: true, dados: solicitacao });
  } catch (erro) {
    next(erro);
  }
};

// PUT /api/solicitacoes/:id/status
const atualizarStatusSolicitacao = async (req, res, next) => {
  try {
    const { status } = req.body;
    const statusValidos = ['pendente', 'confirmada', 'atendida', 'cancelada'];
    if (!statusValidos.includes(status)) {
      return res.status(400).json({ sucesso: false, mensagem: 'Status inválido' });
    }

    const solicitacao = await Solicitacao.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!solicitacao) {
      return res.status(404).json({ sucesso: false, mensagem: 'Solicitação não encontrada' });
    }
    res.json({ sucesso: true, dados: solicitacao });
  } catch (erro) {
    next(erro);
  }
};

module.exports = {
  criarSolicitacao,
  listarSolicitacoes,
  indicadoresSolicitacoes,
  obterSolicitacao,
  atualizarStatusSolicitacao
};
