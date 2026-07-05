const mongoose = require('mongoose');

const NotasSchema = new mongoose.Schema(
  {
    acessibilidade: { type: Number, required: true, min: 1, max: 5 },
    comunicacao: { type: Number, required: true, min: 1, max: 5 },
    conforto: { type: Number, required: true, min: 1, max: 5 },
    atendimento: { type: Number, required: true, min: 1, max: 5 },
    geral: { type: Number, required: true, min: 1, max: 5 }
  },
  { _id: false }
);

const AvaliacaoSchema = new mongoose.Schema(
  {
    espetaculo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Espetaculo',
      required: [true, 'O espetáculo relacionado é obrigatório']
    },
    nomeAvaliador: { type: String, trim: true, default: 'Anônimo' },
    notas: { type: NotasSchema, required: true },
    comentario: { type: String, trim: true, default: '' }
  },
  { timestamps: true }
);

AvaliacaoSchema.index({ espetaculo: 1, createdAt: -1 });

module.exports = mongoose.model('Avaliacao', AvaliacaoSchema);
