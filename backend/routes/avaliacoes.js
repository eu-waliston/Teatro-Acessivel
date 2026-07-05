const express = require('express');
const { body } = require('express-validator');
const validar = require('../middleware/validar');
const { criarAvaliacao, listarAvaliacoes } = require('../controllers/avaliacaoController');

const router = express.Router();

const regrasAvaliacao = [
  body('espetaculo').isMongoId().withMessage('Espetáculo inválido'),
  body('notas.acessibilidade').isInt({ min: 1, max: 5 }),
  body('notas.comunicacao').isInt({ min: 1, max: 5 }),
  body('notas.conforto').isInt({ min: 1, max: 5 }),
  body('notas.atendimento').isInt({ min: 1, max: 5 }),
  body('notas.geral').isInt({ min: 1, max: 5 })
];

router.get('/', listarAvaliacoes);
router.post('/', regrasAvaliacao, validar, criarAvaliacao);

module.exports = router;
