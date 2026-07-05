import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { RECURSOS_SOLICITACAO } from '../config/recursosAcessibilidade';

const recursosIniciais = RECURSOS_SOLICITACAO.reduce((acc, r) => ({ ...acc, [r.chave]: false }), {});

export default function SolicitacaoForm({ espetaculo }) {
  const navegar = useNavigate();
  const [dados, setDados] = useState({
    nomeSolicitante: '',
    email: '',
    telefone: '',
    quantidadeAcompanhantes: 0,
    necessidadesIndividualizadas: ''
  });
  const [recursos, setRecursos] = useState(recursosIniciais);
  const [enviando, setEnviando] = useState(false);
  const [erros, setErros] = useState({});
  const [status, setStatus] = useState(null);

  const atualizarCampo = (campo, valor) => setDados((atual) => ({ ...atual, [campo]: valor }));
  const alternarRecurso = (chave) => setRecursos((atual) => ({ ...atual, [chave]: !atual[chave] }));

  const validar = () => {
    const novosErros = {};
    if (!dados.nomeSolicitante.trim()) novosErros.nomeSolicitante = 'Informe seu nome completo.';
    if (!/^\S+@\S+\.\S+$/.test(dados.email)) novosErros.email = 'Informe um e-mail válido para contato.';
    const algumRecursoMarcado = Object.values(recursos).some(Boolean);
    if (!algumRecursoMarcado && !dados.necessidadesIndividualizadas.trim()) {
      novosErros.recursos = 'Selecione ao menos um recurso ou descreva sua necessidade específica.';
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const enviarFormulario = async (evento) => {
    evento.preventDefault();
    if (!validar()) {
      setStatus({ tipo: 'erro', mensagem: 'Verifique os campos destacados antes de enviar.' });
      return;
    }

    setEnviando(true);
    setStatus(null);
    try {
      await api.post('/solicitacoes', {
        espetaculo: espetaculo._id,
        ...dados,
        quantidadeAcompanhantes: Number(dados.quantidadeAcompanhantes) || 0,
        recursos
      });
      setStatus({
        tipo: 'sucesso',
        mensagem: 'Solicitação enviada com sucesso! Nossa equipe entrará em contato para confirmar os detalhes antes do espetáculo.'
      });
      setDados({ nomeSolicitante: '', email: '', telefone: '', quantidadeAcompanhantes: 0, necessidadesIndividualizadas: '' });
      setRecursos(recursosIniciais);
    } catch (erro) {
      setStatus({
        tipo: 'erro',
        mensagem: erro.response?.data?.mensagem || 'Não foi possível enviar sua solicitação. Tente novamente em instantes.'
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={enviarFormulario} noValidate aria-describedby="solicitacao-instrucoes">
      <p id="solicitacao-instrucoes" className="dica">
        Envie sua solicitação com antecedência para <strong>{espetaculo.nome}</strong> ({new Date(espetaculo.data).toLocaleDateString('pt-BR')}
        , {espetaculo.horario}). Isso ajuda nossa equipe a se organizar para recebê-lo(a) da melhor forma.
      </p>

      {status && (
        <div className={`alerta ${status.tipo === 'sucesso' ? 'alerta-sucesso' : 'alerta-erro'}`} role="alert">
          {status.mensagem}
        </div>
      )}

      {status?.tipo !== 'sucesso' && (
        <>
          <div className="campo">
            <label htmlFor="nomeSolicitante">Nome completo</label>
            <input
              id="nomeSolicitante"
              type="text"
              value={dados.nomeSolicitante}
              onChange={(e) => atualizarCampo('nomeSolicitante', e.target.value)}
              aria-invalid={Boolean(erros.nomeSolicitante)}
              aria-describedby={erros.nomeSolicitante ? 'erro-nome' : undefined}
              required
            />
            {erros.nomeSolicitante && (
              <p id="erro-nome" className="erro-campo">
                {erros.nomeSolicitante}
              </p>
            )}
          </div>

          <div className="campo">
            <label htmlFor="email">E-mail para contato</label>
            <input
              id="email"
              type="email"
              value={dados.email}
              onChange={(e) => atualizarCampo('email', e.target.value)}
              aria-invalid={Boolean(erros.email)}
              aria-describedby={erros.email ? 'erro-email' : undefined}
              required
            />
            {erros.email && (
              <p id="erro-email" className="erro-campo">
                {erros.email}
              </p>
            )}
          </div>

          <div className="campo">
            <label htmlFor="telefone">Telefone / WhatsApp (opcional)</label>
            <input id="telefone" type="tel" value={dados.telefone} onChange={(e) => atualizarCampo('telefone', e.target.value)} />
          </div>

          <div className="campo">
            <label htmlFor="acompanhantes">Número de acompanhantes</label>
            <input
              id="acompanhantes"
              type="number"
              min="0"
              value={dados.quantidadeAcompanhantes}
              onChange={(e) => atualizarCampo('quantidadeAcompanhantes', e.target.value)}
            />
            <p className="dica">Inclua acompanhantes de apoio, se houver.</p>
          </div>

          <fieldset className="campo" style={{ border: 'none', padding: 0 }}>
            <legend>Recursos de acessibilidade necessários</legend>
            <div className="painel" style={{ padding: '0.25rem 1rem' }}>
              {RECURSOS_SOLICITACAO.map((r) => (
                <div className="checkbox-linha" key={r.chave}>
                  <input
                    type="checkbox"
                    id={`recurso-${r.chave}`}
                    checked={recursos[r.chave]}
                    onChange={() => alternarRecurso(r.chave)}
                  />
                  <label htmlFor={`recurso-${r.chave}`}>{r.rotulo}</label>
                </div>
              ))}
            </div>
            {erros.recursos && <p className="erro-campo">{erros.recursos}</p>}
          </fieldset>

          <div className="campo">
            <label htmlFor="necessidades">Necessidades individualizadas (opcional)</label>
            <textarea
              id="necessidades"
              value={dados.necessidadesIndividualizadas}
              onChange={(e) => atualizarCampo('necessidadesIndividualizadas', e.target.value)}
              placeholder="Descreva qualquer necessidade específica não listada acima."
            />
          </div>

          <button type="submit" className="botao botao-primario" disabled={enviando}>
            {enviando ? 'Enviando solicitação…' : 'Enviar solicitação'}
          </button>
        </>
      )}
    </form>
  );
}
