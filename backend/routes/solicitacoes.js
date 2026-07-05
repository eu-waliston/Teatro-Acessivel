const express = require('express');
const { body } = require('express-validator');
const validar = require('../middleware/validar');
const {
  criarSolicitacao,
  listarSolicitacoes,
  indicadoresSolicitacoes,
  obterSolicitacao,
  atualizarStatusSolicitacao
} = require('../controllers/solicitacaoController');

const router = express.Router();

const regrasSolicitacao = [
  body('espetaculo').isMongoId().withMessage('Espetáculo inválido'),
  body('nomeSolicitante').trim().notEmpty().withMessage('O nome é obrigatório'),
  body('email').trim().isEmail().withMessage('E-mail inválido')
];

router.get('/', listarSolicitacoes);
router.get('/indicadores', indicadoresSolicitacoes);
router.get('/:id', obterSolicitacao);
router.post('/', regrasSolicitacao, validar, criarSolicitacao);
router.put('/:id/status', atualizarStatusSolicitacao);

module.exports = router;
