import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import IndicadoresAcessibilidade from '../components/IndicadoresAcessibilidade';
import SolicitacaoForm from '../components/SolicitacaoForm';
import AvaliacaoForm from '../components/AvaliacaoForm';
import AvaliacaoLista from '../components/AvaliacaoLista';
import LoadingSpinner from '../components/LoadingSpinner';
import './EspetaculoDetalhe.css';

const formatarData = (dataIso) =>
  new Date(dataIso).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });

export default function EspetaculoDetalhe() {
  const { id } = useParams();
  const [espetaculo, setEspetaculo] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState('sobre');

  const carregarAvaliacoes = () => {
    api.get('/avaliacoes', { params: { espetaculo: id } }).then((resp) => setAvaliacoes(resp.data.dados));
  };

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    Promise.all([api.get(`/espetaculos/${id}`), api.get('/avaliacoes', { params: { espetaculo: id } })])
      .then(([respEsp, respAval]) => {
        if (!ativo) return;
        setEspetaculo(respEsp.data.dados);
        setAvaliacoes(respAval.data.dados);
      })
      .catch(() => ativo && setErro('Espetáculo não encontrado ou indisponível.'))
      .finally(() => ativo && setCarregando(false));
    return () => {
      ativo = false;
    };
  }, [id]);

  if (carregando) return <LoadingSpinner mensagem="Carregando informações do espetáculo…" />;

  if (erro || !espetaculo) {
    return (
      <main id="conteudo-principal" className="container" style={{ padding: '3rem 1.5rem' }}>
        <div className="alerta alerta-erro" role="alert">
          {erro || 'Espetáculo não encontrado.'}
        </div>
        <Link to="/espetaculos" className="botao botao-secundario">
          Voltar para a programação
        </Link>
      </main>
    );
  }

  const abas = [
    { id: 'sobre', rotulo: 'Sobre' },
    { id: 'acessibilidade', rotulo: 'Acessibilidade' },
    { id: 'solicitar', rotulo: 'Solicitar recursos' },
    { id: 'avaliacoes', rotulo: `Avaliações (${avaliacoes.length})` }
  ];

  return (
    <main id="conteudo-principal">
      <section className="detalhe-topo">
        <img
          src={espetaculo.imagemUrl}
          alt={espetaculo.imagemAltTexto || `Imagem de divulgação do espetáculo ${espetaculo.nome}`}
          className="detalhe-imagem"
        />
        <div className="detalhe-topo-sombra" aria-hidden="true" />
        <div className="container detalhe-topo-conteudo">
          <p className="detalhe-classificacao">Classificação: {espetaculo.classificacaoIndicativa}</p>
          <h1>{espetaculo.nome}</h1>
          <p className="detalhe-info-rapida">
            {formatarData(espetaculo.data)} · {espetaculo.horario} · {espetaculo.duracaoMinutos} min
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2.5rem 1.5rem 4rem' }}>
        <div role="tablist" aria-label="Informações do espetáculo" className="abas">
          {abas.map((aba) => (
            <button
              key={aba.id}
              role="tab"
              id={`tab-${aba.id}`}
              aria-selected={abaAtiva === aba.id}
              aria-controls={`painel-${aba.id}`}
              className={`aba-botao ${abaAtiva === aba.id ? 'aba-botao-ativa' : ''}`}
              onClick={() => setAbaAtiva(aba.id)}
            >
              {aba.rotulo}
            </button>
          ))}
        </div>

        {abaAtiva === 'sobre' && (
          <div role="tabpanel" id="painel-sobre" aria-labelledby="tab-sobre" className="detalhe-painel">
            <h2 className="visually-hidden">Sobre o espetáculo</h2>
            <p style={{ fontSize: '1.05rem' }}>{espetaculo.descricao}</p>
            <h3>Localização e contato</h3>
            <p>{espetaculo.localizacao}</p>
            {espetaculo.contato && (
              <p>
                Contato: <a href={`mailto:${espetaculo.contato}`}>{espetaculo.contato}</a>
              </p>
            )}
          </div>
        )}

        {abaAtiva === 'acessibilidade' && (
          <div role="tabpanel" id="painel-acessibilidade" aria-labelledby="tab-acessibilidade" className="detalhe-painel">
            <h2>Recursos de acessibilidade disponíveis</h2>
            <IndicadoresAcessibilidade recursos={espetaculo.recursosAcessibilidade} />
            {espetaculo.recursosAcessibilidade?.outros && (
              <p style={{ marginTop: '1rem' }}>
                <strong>Outros recursos: </strong>
                {espetaculo.recursosAcessibilidade.outros}
              </p>
            )}
            {espetaculo.orientacoesAcesso && (
              <>
                <h3 style={{ marginTop: '1.5rem' }}>Orientações de acesso</h3>
                <p>{espetaculo.orientacoesAcesso}</p>
              </>
            )}
          </div>
        )}

        {abaAtiva === 'solicitar' && (
          <div role="tabpanel" id="painel-solicitar" aria-labelledby="tab-solicitar" className="detalhe-painel painel" style={{ padding: '1.75rem' }}>
            <h2>Solicitar recursos de acessibilidade</h2>
            <SolicitacaoForm espetaculo={espetaculo} />
          </div>
        )}

        {abaAtiva === 'avaliacoes' && (
          <div role="tabpanel" id="painel-avaliacoes" aria-labelledby="tab-avaliacoes" className="detalhe-painel">
            <h2>Avaliações do público</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)', gap: '2.5rem', alignItems: 'start' }}>
              <div className="painel" style={{ padding: '1.75rem' }}>
                <h3>Deixe sua avaliação</h3>
                <AvaliacaoForm espetaculoId={espetaculo._id} aoAvaliar={carregarAvaliacoes} />
              </div>
              <div>
                <h3>O que o público disse</h3>
                <AvaliacaoLista avaliacoes={avaliacoes} />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
