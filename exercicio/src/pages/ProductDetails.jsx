import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function ProductDetails({ produtos, loading, aoAdicionarAoCarrinho, aoFavoritar }) {
  // useParams lê o :id definido na rota "/produtos/:id"
  const { id } = useParams();
  const produto = produtos.find((item) => String(item.id) === id);

  if (loading) {
    return <p className="mensagem-estado">Carregando produto...</p>;
  }

  // Se o id não corresponder a nenhum produto, avisamos o usuário
  // em vez de deixar a tela em branco
  if (!produto) {
    return (
      <div className="mensagem-estado">
        <p>Não encontramos esse produto.</p>
        <Link to="/produtos" className="botao-primario">
          Voltar para produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="detalhe-produto">
      <img src={produto.imagem} alt={produto.nome} className="detalhe-produto-imagem" />

      <div className="detalhe-produto-info">
        <span className="cartao-produto-categoria">{produto.categoria}</span>
        <h1>{produto.nome}</h1>
        <p className="detalhe-produto-descricao">{produto.descricao}</p>

        <div className="cartao-produto-preco">
          {produto.precoOriginal && (
            <span className="cartao-produto-preco-original">
              {formatarPreco(produto.precoOriginal)}
            </span>
          )}
          <span className="detalhe-produto-preco">{formatarPreco(produto.preco)}</span>
        </div>

        <p className="detalhe-produto-estoque">
          {produto.estoque > 0 ? `${produto.estoque} unidades em estoque` : "Fora de estoque"}
        </p>

        <div className="detalhe-produto-acoes">
          <button
            className="botao-primario"
            onClick={() => aoAdicionarAoCarrinho(produto)}
            disabled={produto.estoque === 0}
          >
            Adicionar ao carrinho
          </button>
          <button className="botao-secundario" onClick={() => aoFavoritar(produto.id)}>
            {produto.favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
