import { Link } from 'react-router-dom';
import IndicadoresAcessibilidade from './IndicadoresAcessibilidade';
import './EspetaculoCard.css';

const formatarData = (dataIso) =>
  new Date(dataIso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

export default function EspetaculoCard({ espetaculo }) {
  return (
    <article className="cartao-espetaculo painel">
      <Link to={`/espetaculos/${espetaculo._id}`} className="cartao-imagem-link">
        <img
          src={espetaculo.imagemUrl || 'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=800'}
          alt={espetaculo.imagemAltTexto || `Imagem de divulgação do espetáculo ${espetaculo.nome}`}
          className="cartao-imagem"
          loading="lazy"
        />
      </Link>
      <div className="cartao-corpo">
        <p className="cartao-data">
          {formatarData(espetaculo.data)} · {espetaculo.horario} · {espetaculo.duracaoMinutos} min
        </p>
        <h3 className="cartao-titulo">
          <Link to={`/espetaculos/${espetaculo._id}`}>{espetaculo.nome}</Link>
        </h3>
        <p className="cartao-descricao">{espetaculo.descricao}</p>
        <IndicadoresAcessibilidade recursos={espetaculo.recursosAcessibilidade} tamanho="compacta" />
        <Link to={`/espetaculos/${espetaculo._id}`} className="botao botao-secundario cartao-cta">
          Ver detalhes e solicitar recursos
        </Link>
      </div>
    </article>
  );
}
