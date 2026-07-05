const mongoose = require('mongoose');

const RecursosSolicitadosSchema = new mongoose.Schema(
  {
    interpreteLibras: { type: Boolean, default: false },
    audiodescricao: { type: Boolean, default: false },
    espacoCadeiraDeRodas: { type: Boolean, default: false },
    apoioMobilidade: { type: Boolean, default: false },
    acompanhamentoEquipe: { type: Boolean, default: false },
    espacoCaoGuia: { type: Boolean, default: false }
  },
  { _id: false }
);

const SolicitacaoSchema = new mongoose.Schema(
  {
    espetaculo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Espetaculo',
      required: [true, 'O espetáculo relacionado é obrigatório']
    },
    nomeSolicitante: { type: String, required: [true, 'O nome é obrigatório'], trim: true },
    email: { type: String, required: [true, 'O e-mail é obrigatório'], trim: true, lowercase: true },
    telefone: { type: String, trim: true, default: '' },
    quantidadeAcompanhantes: { type: Number, default: 0, min: 0 },
    recursos: { type: RecursosSolicitadosSchema, default: () => ({}) },
    necessidadesIndividualizadas: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ['pendente', 'confirmada', 'atendida', 'cancelada'],
      default: 'pendente'
    }
  },
  { timestamps: true }
);

SolicitacaoSchema.index({ espetaculo: 1, createdAt: -1 });

module.exports = mongoose.model('Solicitacao', SolicitacaoSchema);
