const Espetaculo = require('../models/Espetaculo');
const Avaliacao = require('../models/Avaliacao');

// GET /api/espetaculos
// Suporta filtros: ?destaque=true, ?recurso=interpreteLibras, ?busca=texto
const listarEspetaculos = async (req, res, next) => {
  try {
    const filtro = { ativo: true };

    if (req.query.destaque === 'true') {
      filtro.destaque = true;
    }

    if (req.query.recurso) {
      filtro[`recursosAcessibilidade.${req.query.recurso}`] = true;
    }

    if (req.query.busca) {
      filtro.$text = { $search: req.query.busca };
    }

    const espetaculos = await Espetaculo.find(filtro).sort({ data: 1 });
    res.json({ sucesso: true, total: espetaculos.length, dados: espetaculos });
  } catch (erro) {
    next(erro);
  }
};

// GET /api/espetaculos/proximos
const listarProximos = async (req, res, next) => {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const espetaculos = await Espetaculo.find({ ativo: true, data: { $gte: hoje } })
      .sort({ data: 1 })
      .limit(12);
    res.json({ sucesso: true, total: espetaculos.length, dados: espetaculos });
  } catch (erro) {
    next(erro);
  }
};

// GET /api/espetaculos/:id
const obterEspetaculo = async (req, res, next) => {
  try {
    const espetaculo = await Espetaculo.findById(req.params.id);
    if (!espetaculo) {
      return res.status(404).json({ sucesso: false, mensagem: 'Espetáculo não encontrado' });
    }

    const avaliacoes = await Avaliacao.find({ espetaculo: espetaculo._id }).sort({ createdAt: -1 });
    const totalAvaliacoes = avaliacoes.length;
    const media = (campo) =>
      totalAvaliacoes === 0
        ? 0
        : Number((avaliacoes.reduce((soma, a) => soma + a.notas[campo], 0) / totalAvaliacoes).toFixed(1));

    const resumoAvaliacoes = {
      total: totalAvaliacoes,
      medias: {
        acessibilidade: media('acessibilidade'),
        comunicacao: media('comunicacao'),
        conforto: media('conforto'),
        atendimento: media('atendimento'),
        geral: media('geral')
      }
    };

    res.json({ sucesso: true, dados: { ...espetaculo.toObject(), resumoAvaliacoes } });
  } catch (erro) {
    next(erro);
  }
};

// POST /api/espetaculos
const criarEspetaculo = async (req, res, next) => {
  try {
    const espetaculo = await Espetaculo.create(req.body);
    res.status(201).json({ sucesso: true, dados: espetaculo });
  } catch (erro) {
    next(erro);
  }
};

// PUT /api/espetaculos/:id
const atualizarEspetaculo = async (req, res, next) => {
  try {
    const espetaculo = await Espetaculo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!espetaculo) {
      return res.status(404).json({ sucesso: false, mensagem: 'Espetáculo não encontrado' });
    }
    res.json({ sucesso: true, dados: espetaculo });
  } catch (erro) {
    next(erro);
  }
};

// DELETE /api/espetaculos/:id
const removerEspetaculo = async (req, res, next) => {
  try {
    const espetaculo = await Espetaculo.findByIdAndUpdate(req.params.id, { ativo: false }, { new: true });
    if (!espetaculo) {
      return res.status(404).json({ sucesso: false, mensagem: 'Espetáculo não encontrado' });
    }
    res.json({ sucesso: true, mensagem: 'Espetáculo removido com sucesso' });
  } catch (erro) {
    next(erro);
  }
};

module.exports = {
  listarEspetaculos,
  listarProximos,
  obterEspetaculo,
  criarEspetaculo,
  atualizarEspetaculo,
  removerEspetaculo
};
