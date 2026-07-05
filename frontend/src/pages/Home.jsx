import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import EspetaculoCard from '../components/EspetaculoCard';
import LoadingSpinner from '../components/LoadingSpinner';
import './Home.css';

export default function Home() {
  const [destaques, setDestaques] = useState([]);
  const [proximos, setProximos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;
    (async () => {
      try {
        const [respDestaques, respProximos] = await Promise.all([
          api.get('/espetaculos', { params: { destaque: true } }),
          api.get('/espetaculos/proximos')
        ]);
        if (!ativo) return;
        setDestaques(respDestaques.data.dados);
        setProximos(respProximos.data.dados);
      } catch (e) {
        if (ativo) setErro('Não foi possível carregar a programação. Verifique sua conexão e tente novamente.');
      } finally {
        if (ativo) setCarregando(false);
      }
    })();
    return () => {
      ativo = false;
    };
  }, []);

  return (
    <>
      <section className="hero" aria-labelledby="hero-titulo">
        <div className="container hero-conteudo">
          <p className="hero-eyebrow">Programação acessível ao vivo</p>
          <h1 id="hero-titulo">
            Cada espetáculo,
            <br />
            visto e vivido por todos.
          </h1>
          <p className="hero-texto">
            Consulte a programação do Teatro Acessivel, conheça os recursos de acessibilidade de cada
            apresentação e solicite com antecedência o suporte que você precisa.
          </p>
          <div className="hero-acoes">
            <Link to="/espetaculos" className="botao botao-primario">
              Ver programação completa
            </Link>
            <Link to="/sobre" className="botao botao-secundario">
              Conhecer a acessibilidade do teatro
            </Link>
          </div>
        </div>
      </section>

      <main id="conteudo-principal">
        <div className="container">
          {carregando && <LoadingSpinner mensagem="Carregando programação…" />}
          {erro && (
            <div className="alerta alerta-erro" role="alert">
              {erro}
            </div>
          )}

          {!carregando && !erro && (
            <>
              {destaques.length > 0 && (
                <section aria-labelledby="destaques-titulo" style={{ marginTop: '3rem' }}>
                  <h2 id="destaques-titulo">Em destaque</h2>
                  <div className="grade-espetaculos">
                    {destaques.map((e) => (
                      <EspetaculoCard key={e._id} espetaculo={e} />
                    ))}
                  </div>
                </section>
              )}

              <section aria-labelledby="proximos-titulo" style={{ margin: '3.5rem 0' }}>
                <h2 id="proximos-titulo">Próximos espetáculos</h2>
                {proximos.length === 0 ? (
                  <p>Nenhum espetáculo programado no momento. Volte em breve!</p>
                ) : (
                  <div className="grade-espetaculos">
                    {proximos.map((e) => (
                      <EspetaculoCard key={e._id} espetaculo={e} />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
}
