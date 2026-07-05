const { validationResult } = require('express-validator');

// Middleware que verifica os resultados das regras de validação do express-validator
// e interrompe a requisição com uma resposta 400 caso existam erros.
const validar = (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Dados inválidos',
      erros: erros.array().map((e) => ({ campo: e.path, mensagem: e.msg }))
    });
  }
  next();
};

module.exports = validar;
