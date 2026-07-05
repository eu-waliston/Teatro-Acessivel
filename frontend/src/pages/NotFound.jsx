import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main id="conteudo-principal" className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
      <h1>Página não encontrada</h1>
      <p>O conteúdo que você procura não existe ou foi movido.</p>
      <Link to="/" className="botao botao-primario">
        Voltar para a página inicial
      </Link>
    </main>
  );
}
