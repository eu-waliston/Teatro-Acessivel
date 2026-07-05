const mongoose = require('mongoose');

const RecursosAcessibilidadeSchema = new mongoose.Schema(
  {
    interpreteLibras: { type: Boolean, default: false },
    audiodescricao: { type: Boolean, default: false },
    legendagem: { type: Boolean, default: false },
    assentosReservados: { type: Boolean, default: false },
    espacoAcessivel: { type: Boolean, default: false },
    materiaisTateis: { type: Boolean, default: false },
    caoGuia: { type: Boolean, default: false },
    outros: { type: String, trim: true, default: '' }
  },
  { _id: false }
);

const EspetaculoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: [true, 'O nome do espetáculo é obrigatório'], trim: true },
    descricao: { type: String, required: [true, 'A descrição é obrigatória'] },
    imagemUrl: { type: String, default: '' },
    imagemAltTexto: {
      type: String,
      default: '',
      trim: true
    },
    data: { type: Date, required: [true, 'A data do espetáculo é obrigatória'] },
    horario: { type: String, required: [true, 'O horário é obrigatório'] },
    duracaoMinutos: { type: Number, required: true, min: 1 },
    classificacaoIndicativa: { type: String, default: 'Livre' },
    recursosAcessibilidade: { type: RecursosAcessibilidadeSchema, default: () => ({}) },
    orientacoesAcesso: { type: String, default: '' },
    localizacao: { type: String, default: 'Teatro Caixa Preta' },
    contato: { type: String, default: '' },
    mapaUrl: { type: String, default: '' },
    destaque: { type: Boolean, default: false },
    ativo: { type: Boolean, default: true }
  },
  { timestamps: true }
);

EspetaculoSchema.index({ data: 1 });
EspetaculoSchema.index({ nome: 'text', descricao: 'text' });

module.exports = mongoose.model('Espetaculo', EspetaculoSchema);
