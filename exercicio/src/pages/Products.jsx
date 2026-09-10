import { useMemo, useState } from "react";
import ProductForm from "../components/ProductForm.jsx";
import Filters from "../components/Filters.jsx";
import ProductList from "../components/ProductList.jsx";
import "./Products.css";

function Products({
  products,
  loading,
  error,
  addProduct,
  updateProduct,
  deleteProduct,
  aoAdicionarAoCarrinho,
  aoFavoritar,
  totalItensCarrinho,
  totalValorCarrinho
}) {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("todos");
  const [ordenacao, setOrdenacao] = useState("nome");
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

  // useMemo evita recalcular a lista filtrada em toda renderização,
  // só refazendo o cálculo quando os produtos ou os filtros mudam
  const produtosFiltrados = useMemo(() => {
    let resultado = products.filter((produto) =>
      produto.nome.toLowerCase().includes(busca.toLowerCase())
    );

    if (categoria !== "todos") {
      resultado = resultado.filter((produto) => produto.categoria === categoria);
    }

    resultado = [...resultado].sort((a, b) => {
      if (ordenacao === "preco-menor") return a.preco - b.preco;
      if (ordenacao === "preco-maior") return b.preco - a.preco;
      if (ordenacao === "categoria") return a.categoria.localeCompare(b.categoria);
      return a.nome.localeCompare(b.nome);
    });

    return resultado;
  }, [products, busca, categoria, ordenacao]);

  function aoSalvarProduto(dados) {
    if (produtoEmEdicao) {
      updateProduct(produtoEmEdicao.id, dados);
      setProdutoEmEdicao(null);
    } else {
      addProduct(dados);
    }
  }

  function aoExcluirProduto(id) {
    const confirmou = window.confirm("Tem certeza que deseja excluir este produto?");
    if (confirmou) {
      deleteProduct(id);
    }
  }

  return (
    <div>
      <h1 className="secao-titulo">Produtos</h1>

      {/* Contadores simples: total de produtos cadastrados e valor do carrinho */}
      <div className="resumo-loja">
        <span>
          <strong>{products.length}</strong> produtos cadastrados
        </span>
        <span>
          <strong>{totalItensCarrinho}</strong> itens no carrinho
        </span>
        <span>
          Carrinho:{" "}
          <strong>
            {totalValorCarrinho.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </strong>
        </span>
      </div>

      <ProductForm
        produtoEmEdicao={produtoEmEdicao}
        aoSalvar={aoSalvarProduto}
        aoCancelarEdicao={() => setProdutoEmEdicao(null)}
      />

      <Filters
        busca={busca}
        aoMudarBusca={setBusca}
        categoria={categoria}
        aoMudarCategoria={setCategoria}
        ordenacao={ordenacao}
        aoMudarOrdenacao={setOrdenacao}
      />

      {loading && <p className="mensagem-estado">Carregando produtos...</p>}
      {!loading && error && <p className="mensagem-estado">{error}</p>}

      {!loading && (
        <ProductList
          produtos={produtosFiltrados}
          aoAdicionarAoCarrinho={aoAdicionarAoCarrinho}
          aoFavoritar={aoFavoritar}
          aoEditar={setProdutoEmEdicao}
          aoExcluir={aoExcluirProduto}
          modoAdmin
        />
      )}
    </div>
  );
}

export default Products;
