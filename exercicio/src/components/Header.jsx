import { Link, NavLink } from "react-router-dom";
import "./Header.css";

// O Header recebe por props o estado do tema e os totais do carrinho/favoritos,
// já que ele mesmo não guarda esses dados
function Header({ temaEscuro, aoAlternarTema, totalCarrinho, totalFavoritos }) {
  return (
    <header className="cabecalho">
      <div className="container cabecalho-conteudo">
        <Link to="/" className="cabecalho-logo">
          <span className="cabecalho-logo-icone">H</span>
          <span>Loja Horizonte</span>
        </Link>

        <nav className="cabecalho-nav" aria-label="Navegação principal">
          <NavLink to="/" end>
            Início
          </NavLink>
          <NavLink to="/produtos">Produtos</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
        </nav>

        <div className="cabecalho-acoes">
          <button
            className="botao-secundario"
            onClick={aoAlternarTema}
            aria-label={temaEscuro ? "Ativar tema claro" : "Ativar tema escuro"}
          >
            {temaEscuro ? "Modo claro" : "Modo escuro"}
          </button>

          <span className="cabecalho-indicador" title="Produtos favoritados">
            ♥ {totalFavoritos}
          </span>

          <span className="cabecalho-indicador" title="Itens no carrinho">
            🛒 {totalCarrinho}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
