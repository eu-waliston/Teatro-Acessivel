export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
      <div className="container" style={{ padding: '2.5rem 1.5rem', color: 'var(--text-faint)', fontSize: '0.9rem' }}>
        <p style={{ margin: 0 }}>
          Teatro Caixa Preta — Sistema de Solicitação de Recursos de Acessibilidade.
        </p>
        <p style={{ margin: '0.4rem 0 0' }}>
          Dúvidas ou necessidades específicas não listadas?{' '}
          <a href="mailto:acessibilidade@tatro.acessivel.com.br">acessibilidade@tatro.acessivel.com.br</a>
        </p>
      </div>
    </footer>
  );
}
