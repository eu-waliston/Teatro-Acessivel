import { useEffect, useState } from 'react';
import api from '../api/api';
import EspetaculoCard from '../components/EspetaculoCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { RECURSOS_ESPETACULO } from '../config/recursosAcessibilidade';

export default function ListaEspetaculos() {
  const [espetaculos, setEspetaculos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroRecurso, setFiltroRecurso] = useState('');

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    const params = filtroRecurso ? { recurso: filtroRecurso } : {};
    api
      .get('/espetaculos', { params })
      .then((resp) => ativo && setEspetaculos(resp.data.dados))
      .catch(() => ativo && setErro('Não foi possível carregar a programação.'))
      .finally(() => ativo && setCarregando(false));
    return () => {
      ativo = false;
    };
  }, [filtroRecurso]);

  return (
    <main id="conteudo-principal" className="container" style={{ padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '2rem' }}>Programação</h1>
      <p>Filtre os espetáculos por recurso de acessibilidade disponível.</p>

      <div className="campo" style={{ maxWidth: 360 }}>
        <label htmlFor="filtroRecurso">Filtrar por recurso de acessibilidade</label>
        <select id="filtroRecurso" value={filtroRecurso} onChange={(e) => setFiltroRecurso(e.target.value)}>
          <option value="">Todos os espetáculos</option>
          {RECURSOS_ESPETACULO.map((r) => (
            <option key={r.chave} value={r.chave}>
              {r.rotulo}
            </option>
          ))}
        </select>
      </div>

      {carregando && <LoadingSpinner />}
      {erro && (
        <div className="alerta alerta-erro" role="alert">
          {erro}
        </div>
      )}

      {!carregando && !erro && (
        <>
          <p aria-live="polite" className="dica">
            {espetaculos.length} espetáculo(s) encontrado(s).
          </p>
          <div className="grade-espetaculos" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {espetaculos.map((e) => (
              <EspetaculoCard key={e._id} espetaculo={e} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
