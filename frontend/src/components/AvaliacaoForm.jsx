import { useState } from 'react';
import api from '../api/api';
import EstrelaInput from './EstrelaInput';

const CRITERIOS = [
  { chave: 'acessibilidade', rotulo: 'Acessibilidade do evento' },
  { chave: 'comunicacao', rotulo: 'Qualidade da comunicação' },
  { chave: 'conforto', rotulo: 'Conforto do espaço' },
  { chave: 'atendimento', rotulo: 'Atendimento recebido' },
  { chave: 'geral', rotulo: 'Experiência geral' }
];

const notasIniciais = { acessibilidade: 0, comunicacao: 0, conforto: 0, atendimento: 0, geral: 0 };

export default function AvaliacaoForm({ espetaculoId, aoAvaliar }) {
  const [nomeAvaliador, setNomeAvaliador] = useState('');
  const [notas, setNotas] = useState(notasIniciais);
  const [comentario, setComentario] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [status, setStatus] = useState(null); // { tipo: 'sucesso' | 'erro', mensagem }

  const atualizarNota = (chave, valor) => setNotas((atual) => ({ ...atual, [chave]: valor }));

  const todasNotasPreenchidas = CRITERIOS.every((c) => notas[c.chave] > 0);

  const enviarFormulario = async (evento) => {
    evento.preventDefault();
    if (!todasNotasPreenchidas) {
      setStatus({ tipo: 'erro', mensagem: 'Por favor, atribua uma nota para todos os critérios antes de enviar.' });
      return;
    }

    setEnviando(true);
    setStatus(null);
    try {
      const resposta = await api.post('/avaliacoes', {
        espetaculo: espetaculoId,
        nomeAvaliador: nomeAvaliador.trim() || 'Anônimo',
        notas,
        comentario: comentario.trim()
      });
      setStatus({ tipo: 'sucesso', mensagem: 'Obrigado! Sua avaliação foi registrada com sucesso.' });
      setNotas(notasIniciais);
      setComentario('');
      setNomeAvaliador('');
      aoAvaliar?.(resposta.data.dados);
    } catch (erro) {
      setStatus({
        tipo: 'erro',
        mensagem: erro.response?.data?.mensagem || 'Não foi possível enviar sua avaliação. Tente novamente.'
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={enviarFormulario} noValidate aria-describedby="avaliacao-instrucoes">
      <p id="avaliacao-instrucoes" className="dica">
        Compartilhe sua experiência para nos ajudar a melhorar os próximos espetáculos.
      </p>

      {status && (
        <div className={`alerta ${status.tipo === 'sucesso' ? 'alerta-sucesso' : 'alerta-erro'}`} role="alert">
          {status.mensagem}
        </div>
      )}

      <div className="campo">
        <label htmlFor="nomeAvaliador">Seu nome (opcional)</label>
        <input
          id="nomeAvaliador"
          type="text"
          value={nomeAvaliador}
          onChange={(e) => setNomeAvaliador(e.target.value)}
          placeholder="Deixe em branco para avaliar anonimamente"
        />
      </div>

      {CRITERIOS.map((c) => (
        <EstrelaInput key={c.chave} nome={`nota-${c.chave}`} rotulo={c.rotulo} valor={notas[c.chave]} aoAlterar={(v) => atualizarNota(c.chave, v)} />
      ))}

      <div className="campo">
        <label htmlFor="comentario">Comentários, sugestões ou elogios</label>
        <textarea
          id="comentario"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Conte um pouco sobre sua experiência…"
        />
      </div>

      <button type="submit" className="botao botao-primario" disabled={enviando}>
        {enviando ? 'Enviando avaliação…' : 'Enviar avaliação'}
      </button>
    </form>
  );
}
