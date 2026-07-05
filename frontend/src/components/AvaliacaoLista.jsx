const formatarData = (dataIso) =>
  new Date(dataIso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

function EstrelasLeitura({ valor, rotulo }) {
  return (
    <span className="estrelas-leitura" title={`${rotulo}: ${valor} de 5`}>
      <span aria-hidden="true">{'★'.repeat(valor)}{'☆'.repeat(5 - valor)}</span>
      <span className="visually-hidden">
        {rotulo}: {valor} de 5 estrelas
      </span>
    </span>
  );
}

export default function AvaliacaoLista({ avaliacoes }) {
  if (!avaliacoes || avaliacoes.length === 0) {
    return <p className="dica">Este espetáculo ainda não recebeu avaliações. Seja a primeira pessoa a avaliar!</p>;
  }

  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {avaliacoes.map((av) => (
        <li key={av._id} className="painel" style={{ padding: '1.1rem 1.3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
            <strong>{av.nomeAvaliador || 'Anônimo'}</strong>
            <span style={{ color: 'var(--text-faint)', fontSize: '0.85rem' }}>{formatarData(av.createdAt)}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.25rem', marginBottom: av.comentario ? '0.6rem' : 0, color: 'var(--accent-spotlight-strong)' }}>
            <EstrelasLeitura valor={av.notas.geral} rotulo="Experiência geral" />
          </div>
          {av.comentario && <p style={{ margin: 0 }}>{av.comentario}</p>}
        </li>
      ))}
    </ul>
  );
}
