const Avaliacao = require('../models/Avaliacao');
const Espetaculo = require('../models/Espetaculo');

// POST /api/avaliacoes
const criarAvaliacao = async (req, res, next) => {
  try {
    const espetaculo = await Espetaculo.findById(req.body.espetaculo);
    if (!espetaculo) {
      return res.status(404).json({ sucesso: false, mensagem: 'Espetáculo informado não existe' });
    }

    const avaliacao = await Avaliacao.create(req.body);
    res.status(201).json({ sucesso: true, dados: avaliacao });
  } catch (erro) {
    next(erro);
  }
};

// GET /api/avaliacoes?espetaculo=id
const listarAvaliacoes = async (req, res, next) => {
  try {
    const filtro = {};
    if (req.query.espetaculo) filtro.espetaculo = req.query.espetaculo;

    const avaliacoes = await Avaliacao.find(filtro).sort({ createdAt: -1 });
    res.json({ sucesso: true, total: avaliacoes.length, dados: avaliacoes });
  } catch (erro) {
    next(erro);
  }
};

module.exports = { criarAvaliacao, listarAvaliacoes };
