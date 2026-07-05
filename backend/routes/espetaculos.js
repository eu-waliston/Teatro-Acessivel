const express = require('express');
const { body } = require('express-validator');
const validar = require('../middleware/validar');
const {
  listarEspetaculos,
  listarProximos,
  obterEspetaculo,
  criarEspetaculo,
  atualizarEspetaculo,
  removerEspetaculo
} = require('../controllers/espetaculoController');

const router = express.Router();

const regrasEspetaculo = [
  body('nome').trim().notEmpty().withMessage('O nome é obrigatório'),
  body('descricao').trim().notEmpty().withMessage('A descrição é obrigatória'),
  body('data').isISO8601().withMessage('Data inválida'),
  body('horario').trim().notEmpty().withMessage('O horário é obrigatório'),
  body('duracaoMinutos').isInt({ min: 1 }).withMessage('A duração deve ser um número positivo')
];

router.get('/', listarEspetaculos);
router.get('/proximos', listarProximos);
router.get('/:id', obterEspetaculo);
router.post('/', regrasEspetaculo, validar, criarEspetaculo);
router.put('/:id', atualizarEspetaculo);
router.delete('/:id', removerEspetaculo);

module.exports = router;
