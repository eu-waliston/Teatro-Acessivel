const REQUISITOS = [
  { titulo: 'Navegação simplificada', texto: 'Estrutura de menus enxuta e caminhos curtos até qualquer informação ou funcionalidade.' },
  { titulo: 'Contraste adequado', texto: 'Paleta escura com alto contraste entre texto e fundo, seguindo as diretrizes WCAG.' },
  { titulo: 'Compatibilidade com leitores de tela', texto: 'Uso de HTML semântico, papéis (roles) e textos alternativos em toda a plataforma.' },
  { titulo: 'Descrição alternativa de imagens', texto: 'Todas as imagens de divulgação possuem texto alternativo descritivo.' },
  { titulo: 'Navegação por teclado', texto: 'Todos os elementos interativos podem ser acessados e operados sem o uso do mouse.' },
  { titulo: 'Responsividade', texto: 'Layout adaptável para computadores, tablets e smartphones.' },
  { titulo: 'Linguagem clara', texto: 'Textos objetivos, evitando jargões técnicos desnecessários.' },
  { titulo: 'Botões acessíveis', texto: 'Áreas de toque amplas (mínimo 44x44px) e rótulos descritivos em todas as ações.' },
  { titulo: 'Organização hierárquica do conteúdo', texto: 'Uso correto de títulos e subtítulos para facilitar a navegação por seções.' }
];

export default function Sobre() {
  return (
    <main id="conteudo-principal" className="container" style={{ padding: '3rem 1.5rem 4rem', maxWidth: 860 }}>
      <h1>Compromisso com a acessibilidade</h1>
      <p style={{ fontSize: '1.05rem' }}>
        O próprio Sistema de Solicitação de Recursos de Acessibilidade do Teatro Caixa Preta é construído seguindo
        princípios de acessibilidade digital, para que a ferramenta que promove inclusão também seja, ela mesma,
        inclusiva.
      </p>

      <h2 style={{ marginTop: '2.5rem' }}>Requisitos seguidos na construção da plataforma</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0', display: 'grid', gap: '1rem' }}>
        {REQUISITOS.map((r) => (
          <li key={r.titulo} className="painel" style={{ padding: '1.25rem 1.5rem' }}>
            <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', textTransform: 'none' }}>{r.titulo}</h3>
            <p style={{ margin: 0 }}>{r.texto}</p>
          </li>
        ))}
      </ul>

      <h2>Próximos passos</h2>
      <p>
        Também está prevista, em versões futuras, a integração de mecanismos de leitura automática e audiodescrição
        de conteúdos diretamente na plataforma.
      </p>
    </main>
  );
}
