import { useEffect, useState } from "react";
import { produtosIniciais } from "../data/produtosIniciais.js";

const CHAVE_LOCAL_STORAGE = "loja-horizonte-produtos";

// Hook responsável por toda a lógica de dados dos produtos:
// carregar, criar, editar, excluir e manter tudo salvo no navegador
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Roda uma única vez, quando o componente que usa o hook é montado
  useEffect(() => {
    // Simula um carregamento inicial, como se os dados viessem de um servidor
    const tempoDeCarregamento = setTimeout(() => {
      try {
        const salvos = localStorage.getItem(CHAVE_LOCAL_STORAGE);
        setProducts(salvos ? JSON.parse(salvos) : produtosIniciais);
      } catch {
        // Se o localStorage estiver corrompido ou bloqueado, caímos para os dados padrão
        setError("Não foi possível carregar os produtos salvos. Mostrando os produtos padrão.");
        setProducts(produtosIniciais);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(tempoDeCarregamento);
  }, []);

  // Sempre que a lista de produtos mudar, guarda uma cópia no localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(CHAVE_LOCAL_STORAGE, JSON.stringify(products));
    }
  }, [products, loading]);

  // Adiciona um novo produto à lista
  function addProduct(dadosProduto) {
    const novoProduto = {
      ...dadosProduto,
      id: Date.now(),
      destaque: false,
      emOferta: false,
      precoOriginal: null,
      estoque: 10,
      favorito: false
    };

    setProducts((atual) => [...atual, novoProduto]);
  }

  // Atualiza um produto existente, sem mutar o array original:
  // criamos um novo array com o produto já modificado
  function updateProduct(id, dadosAtualizados) {
    setProducts((atual) =>
      atual.map((produto) =>
        produto.id === id ? { ...produto, ...dadosAtualizados } : produto
      )
    );
  }

  // Remove um produto do estado, também sem mutar o array original
  function deleteProduct(id) {
    setProducts((atual) => atual.filter((produto) => produto.id !== id));
  }

  // Alterna se um produto está em destaque
  function toggleDestaque(id) {
    updateProduct(id, {
      destaque: !products.find((produto) => produto.id === id)?.destaque
    });
  }

  // Alterna se um produto está favoritado
  function toggleFavorito(id) {
    updateProduct(id, {
      favorito: !products.find((produto) => produto.id === id)?.favorito
    });
  }

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleDestaque,
    toggleFavorito
  };
}
