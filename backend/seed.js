require('dotenv').config();
const mongoose = require('mongoose');
const conectarBancoDeDados = require('./config/db');
const Espetaculo = require('./models/Espetaculo');
const Solicitacao = require('./models/Solicitacao');
const Avaliacao = require('./models/Avaliacao');

const espetaculosExemplo = [
  {
    nome: 'Vozes do Silêncio',
    descricao:
      'Espetáculo de dança-teatro que utiliza movimento e projeções visuais para narrar histórias sobre comunicação e pertencimento. Encenação totalmente acessível, com Libras integrada à dramaturgia.',
    imagemUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1200',
    imagemAltTexto: 'Bailarinos em cena escura com iluminação pontual dourada sobre o palco.',
    data: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    horario: '20:00',
    duracaoMinutos: 75,
    classificacaoIndicativa: '10 anos',
    recursosAcessibilidade: {
      interpreteLibras: true,
      audiodescricao: true,
      legendagem: false,
      assentosReservados: true,
      espacoAcessivel: true,
      materiaisTateis: true,
      caoGuia: true,
      outros: 'Programa em braile disponível na bilheteria'
    },
    orientacoesAcesso: 'Entrada preferencial pela Rua das Artes, 120, com rampa de acesso e elevador até a plateia.',
    localizacao: 'Teatro Caixa Preta - Sala Principal',
    contato: 'acessibilidade@teatrocaixapreta.com.br',
    destaque: true
  },
  {
    nome: 'A Última Cena',
    descricao:
      'Drama contemporâneo sobre memória e perda, com cenário minimalista e trilha sonora original executada ao vivo.',
    imagemUrl: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?q=80&w=1200',
    imagemAltTexto: 'Ator solitário em palco escuro iluminado por um único foco de luz branca.',
    data: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    horario: '19:30',
    duracaoMinutos: 90,
    classificacaoIndicativa: '14 anos',
    recursosAcessibilidade: {
      interpreteLibras: false,
      audiodescricao: true,
      legendagem: true,
      assentosReservados: true,
      espacoAcessivel: true,
      materiaisTateis: false,
      caoGuia: true,
      outros: ''
    },
    orientacoesAcesso: 'Assentos reservados nas fileiras A e B, próximos às saídas.',
    localizacao: 'Teatro Caixa Preta - Sala Principal',
    contato: 'acessibilidade@teatrocaixapreta.com.br',
    destaque: true
  },
  {
    nome: 'Fragmentos Urbanos',
    descricao:
      'Espetáculo coletivo de teatro físico inspirado no cotidiano das grandes cidades, com forte apelo visual e sonoro.',
    imagemUrl: 'https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?q=80&w=1200',
    imagemAltTexto: 'Grupo de atores em movimento coreografado sob luzes coloridas.',
    data: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    horario: '21:00',
    duracaoMinutos: 60,
    classificacaoIndicativa: 'Livre',
    recursosAcessibilidade: {
      interpreteLibras: true,
      audiodescricao: false,
      legendagem: false,
      assentosReservados: true,
      espacoAcessivel: true,
      materiaisTateis: false,
      caoGuia: true,
      outros: ''
    },
    orientacoesAcesso: 'Espaço plano, sem escadas entre a entrada e a plateia.',
    localizacao: 'Teatro Caixa Preta - Sala Experimental',
    contato: 'acessibilidade@teatrocaixapreta.com.br',
    destaque: false
  }
];

const executarSeed = async () => {
  await conectarBancoDeDados();

  await Promise.all([Espetaculo.deleteMany({}), Solicitacao.deleteMany({}), Avaliacao.deleteMany({})]);

  const espetaculosCriados = await Espetaculo.insertMany(espetaculosExemplo);
  console.log(`[Seed] ${espetaculosCriados.length} espetáculos criados`);

  await Avaliacao.insertMany([
    {
      espetaculo: espetaculosCriados[0]._id,
      nomeAvaliador: 'Maria S.',
      notas: { acessibilidade: 5, comunicacao: 5, conforto: 4, atendimento: 5, geral: 5 },
      comentario: 'Intérprete de Libras muito bem posicionado e visível de qualquer assento.'
    },
    {
      espetaculo: espetaculosCriados[0]._id,
      nomeAvaliador: 'João P.',
      notas: { acessibilidade: 4, comunicacao: 4, conforto: 4, atendimento: 5, geral: 4 },
      comentario: 'Ótima experiência, equipe muito atenciosa na recepção.'
    }
  ]);
  console.log('[Seed] Avaliações de exemplo criadas');

  console.log('[Seed] Concluído com sucesso');
  await mongoose.connection.close();
  process.exit(0);
};

executarSeed().catch((erro) => {
  console.error('[Seed] Erro:', erro);
  process.exit(1);
});
