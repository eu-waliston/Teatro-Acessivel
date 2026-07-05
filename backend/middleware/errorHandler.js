// Middleware central de tratamento de erros da API
const errorHandler = (erro, req, res, next) => {
  console.error(erro);

  if (erro.name === 'ValidationError') {
    const mensagens = Object.values(erro.errors).map((e) => e.message);
    return res.status(400).json({ sucesso: false, mensagem: 'Erro de validação', erros: mensagens });
  }

  if (erro.name === 'CastError') {
    return res.status(400).json({ sucesso: false, mensagem: 'Identificador inválido' });
  }

  res.status(erro.status || 500).json({
    sucesso: false,
    mensagem: erro.message || 'Erro interno no servidor'
  });
};

module.exports = errorHandler;
