import { NavLink } from 'react-router-dom';
import './Navbar.css';

const linkClasse = ({ isActive }) => 'nav-link' + (isActive ? ' nav-link-ativo' : '');

export default function Navbar() {
  return (
    <header className="cabecalho">
      <div className="container cabecalho-conteudo">
        <NavLink to="/" className="marca" aria-label="Teatro Acessivel, página inicial">
          <span className="marca-lampada" aria-hidden="true"></span>
          <span>
            Teatro <strong>Acessivel</strong>
          </span>
        </NavLink>
        <nav aria-label="Navegação principal" className="nav-principal">
          <ul>
            <li>
              <NavLink to="/" className={linkClasse} end>
                Início
              </NavLink>
            </li>
            <li>
              <NavLink to="/espetaculos" className={linkClasse}>
                Programação
              </NavLink>
            </li>
            <li>
              <NavLink to="/sobre" className={linkClasse}>
                Acessibilidade
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
