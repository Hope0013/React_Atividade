import ProductCard from "./ProductCard.jsx";
import "./ProductList.css";

// Recebe a lista já filtrada de produtos e apenas se preocupa em exibi-la
function ProductList({ produtos, aoAdicionarAoCarrinho, aoFavoritar, aoEditar, aoExcluir, modoAdmin }) {
  // Renderização condicional: se não houver produtos, mostramos uma mensagem
  // em vez da grade vazia
  if (produtos.length === 0) {
    return (
      <p className="mensagem-estado">
        Nenhum produto encontrado com os filtros selecionados.
      </p>
    );
  }

  return (
    <div className="grade-produtos">
      {produtos.map((produto) => (
        <div key={produto.id} className="grade-produtos-item">
          <ProductCard
            produto={produto}
            aoAdicionarAoCarrinho={aoAdicionarAoCarrinho}
            aoFavoritar={aoFavoritar}
          />

          {/* As ações de editar e excluir só aparecem na página de administração de produtos */}
          {modoAdmin && (
            <div className="grade-produtos-acoes">
              <button className="botao-secundario" onClick={() => aoEditar(produto)}>
                Editar
              </button>
              <button className="botao-secundario" onClick={() => aoExcluir(produto.id)}>
                Excluir
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductList;
