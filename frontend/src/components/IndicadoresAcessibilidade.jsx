import { RECURSOS_ESPETACULO, CATEGORIAS } from '../config/recursosAcessibilidade';
import './IndicadoresAcessibilidade.css';

// Exibe apenas os recursos marcados como disponíveis (true) no espetáculo.
// Cada indicador é um badge com sigla + cor por categoria, e um rótulo
// textual sempre presente (nunca depende só da cor), garantindo que a
// informação também chegue a quem usa leitor de tela ou não percebe cor.
export default function IndicadoresAcessibilidade({ recursos, tamanho = 'normal' }) {
  if (!recursos) return null;

  const disponiveis = RECURSOS_ESPETACULO.filter((r) => recursos[r.chave]);

  if (disponiveis.length === 0) {
    return <p className="dica-sem-recursos">Nenhum recurso de acessibilidade informado para este espetáculo.</p>;
  }

  return (
    <ul className={`lista-indicadores lista-indicadores--${tamanho}`} aria-label="Recursos de acessibilidade disponíveis">
      {disponiveis.map((r) => {
        const categoria = CATEGORIAS[r.categoria];
        return (
          <li key={r.chave} className="indicador" title={`${r.rotulo} — ${categoria.rotulo}`}>
            <span className="indicador-selo" style={{ '--cor-categoria': categoria.cor }} aria-hidden="true">
              {r.sigla}
            </span>
            <span className="indicador-rotulo">{r.rotulo}</span>
          </li>
        );
      })}
    </ul>
  );
}
