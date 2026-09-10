import { Link } from "react-router-dom";
import "./ProductCard.css";

// Formata um número para o formato de moeda brasileira
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Componente de cartão de produto. Recebe o produto inteiro e algumas
// funções de callback via props, para não precisar saber como o carrinho
// ou os favoritos funcionam por dentro
function ProductCard({ produto, aoAdicionarAoCarrinho, aoFavoritar }) {
  const semEstoque = produto.estoque === 0;

  return (
    <article className={`cartao-produto ${semEstoque ? "cartao-produto-esgotado" : ""}`}>
      <div className="cartao-produto-imagem-wrapper">
        <img src={produto.imagem} alt={produto.nome} className="cartao-produto-imagem" />

        {/* Selo mostrado apenas quando o produto está em destaque ou em oferta */}
        {produto.destaque && <span className="selo selo-destaque">Destaque</span>}
        {produto.emOferta && <span className="selo selo-oferta">Oferta</span>}

        <button
          className="cartao-produto-favorito"
          onClick={() => aoFavoritar(produto.id)}
          aria-pressed={produto.favorito}
          aria-label={produto.favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {produto.favorito ? "♥" : "♡"}
        </button>
      </div>

      <div className="cartao-produto-corpo">
        <span className="cartao-produto-categoria">{produto.categoria}</span>
        <h3 className="cartao-produto-nome">
          <Link to={`/produtos/${produto.id}`}>{produto.nome}</Link>
        </h3>

        <div className="cartao-produto-preco">
          {produto.precoOriginal && (
            <span className="cartao-produto-preco-original">
              {formatarPreco(produto.precoOriginal)}
            </span>
          )}
          <span>{formatarPreco(produto.preco)}</span>
        </div>

        {semEstoque ? (
          <span className="cartao-produto-status">Fora de estoque</span>
        ) : (
          <button
            className="botao-primario cartao-produto-botao"
            onClick={() => aoAdicionarAoCarrinho(produto)}
          >
            Adicionar ao carrinho
          </button>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
