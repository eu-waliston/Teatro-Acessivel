export default function LoadingSpinner({ mensagem = 'Carregando conteúdo…' }) {
  return (
    <div role="status" aria-live="polite" style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
      <div
        aria-hidden="true"
        style={{
          width: 36,
          height: 36,
          margin: '0 auto 1rem',
          borderRadius: '50%',
          border: '3px solid var(--border)',
          borderTopColor: 'var(--accent-spotlight)',
          animation: 'girar 0.8s linear infinite'
        }}
      />
      <span>{mensagem}</span>
      <style>{`@keyframes girar { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
