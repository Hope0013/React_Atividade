import { Link } from "react-router-dom";
import ProductList from "../components/ProductList.jsx";
import "./Home.css";

function Home({ products, loading, error, aoAdicionarAoCarrinho, aoFavoritar }) {
  const produtosEmDestaque = products.filter((produto) => produto.destaque);

  return (
    <div>
      <section className="banner">
        <div>
          <h1>Loja Horizonte</h1>
          <p>
            Eletrônicos, roupas, acessórios e itens para casa, selecionados com
            cuidado para o seu dia a dia.
          </p>
          <Link to="/produtos" className="botao-primario banner-botao">
            Ver todos os produtos
          </Link>
        </div>
      </section>

      <section>
        <h2 className="secao-titulo">Produtos em destaque</h2>

        {/* Estado de carregamento: mostramos uma mensagem enquanto os dados chegam */}
        {loading && <p className="mensagem-estado">Carregando produtos...</p>}

        {/* Estado de erro: a lista ainda aparece (com os dados salvos localmente),
            mas avisamos o usuário que a API não respondeu */}
        {!loading && error && <p className="mensagem-estado">{error}</p>}

        {!loading && (
          <ProductList
            produtos={produtosEmDestaque}
            aoAdicionarAoCarrinho={aoAdicionarAoCarrinho}
            aoFavoritar={aoFavoritar}
            modoAdmin={false}
          />
        )}
      </section>
    </div>
  );
}

export default Home;
