import { useEffect, useState } from "react";

const CHAVE_CARRINHO = "loja-horizonte-carrinho";

// Hook simples para guardar quantos itens de cada produto estão no carrinho
export function useCart() {
  const [itens, setItens] = useState(() => {
    const salvos = localStorage.getItem(CHAVE_CARRINHO);
    return salvos ? JSON.parse(salvos) : [];
  });

  // Guarda o carrinho no localStorage sempre que ele mudar
  useEffect(() => {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
  }, [itens]);

  // Adiciona um produto ao carrinho, aumentando a quantidade se ele já estiver lá
  function adicionarAoCarrinho(produto) {
    setItens((atual) => {
      const jaExiste = atual.find((item) => item.id === produto.id);

      if (jaExiste) {
        return atual.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...atual, { id: produto.id, nome: produto.nome, preco: produto.preco, quantidade: 1 }];
    });
  }

  // Quantidade total de itens (somando as quantidades de cada produto)
  const totalItens = itens.reduce((soma, item) => soma + item.quantidade, 0);

  // Valor total do carrinho em reais
  const totalValor = itens.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  return { itens, adicionarAoCarrinho, totalItens, totalValor };
}
