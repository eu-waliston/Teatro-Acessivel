const mongoose = require('mongoose');

const conectarBancoDeDados = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/teatro_caixa_preta';
    await mongoose.connect(uri);
    console.log(`[MongoDB] Conectado com sucesso: ${mongoose.connection.host}`);
  } catch (erro) {
    console.error('[MongoDB] Erro ao conectar:', erro.message);
    process.exit(1);
  }
};

module.exports = conectarBancoDeDados;
