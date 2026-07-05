require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const conectarBancoDeDados = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const espetaculosRoutes = require('./routes/espetaculos');
const solicitacoesRoutes = require('./routes/solicitacoes');
const avaliacoesRoutes = require('./routes/avaliacoes');

const app = express();

conectarBancoDeDados();

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/saude', (req, res) => {
  res.json({ sucesso: true, mensagem: 'API do Teatro Caixa Preta ativa' });
});

app.use('/api/espetaculos', espetaculosRoutes);
app.use('/api/solicitacoes', solicitacoesRoutes);
app.use('/api/avaliacoes', avaliacoesRoutes);

app.use((req, res) => {
  res.status(404).json({ sucesso: false, mensagem: 'Rota não encontrada' });
});

app.use(errorHandler);

const PORTA = process.env.PORT || 5000;
app.listen(PORTA, () => {
  console.log(`[Servidor] Rodando na porta ${PORTA}`);
});
