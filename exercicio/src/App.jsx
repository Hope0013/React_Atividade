import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useProducts } from "./hooks/useProducts.js";
import { useCart } from "./hooks/useCart.js";

function App() {
  // O tema (claro/escuro) começa lendo o que já estava salvo, para não "piscar" ao recarregar
  const [temaEscuro, setTemaEscuro] = useState(
    () => localStorage.getItem("loja-horizonte-tema") === "escuro"
  );

  // Todo o estado de produtos e carrinho fica aqui em cima, no componente raiz,
  // e desce para as páginas por props. Assim as duas páginas (Home e Produtos)
  // compartilham os mesmos dados
  const produtosState = useProducts();
  const { itens, adicionarAoCarrinho, totalItens, totalValor } = useCart();

  // Aplica o atributo data-theme no html sempre que o tema mudar
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", temaEscuro ? "dark" : "light");
    localStorage.setItem("loja-horizonte-tema", temaEscuro ? "escuro" : "claro");
  }, [temaEscuro]);

  const totalFavoritos = produtosState.products.filter((produto) => produto.favorito).length;

  return (
    <>
      <Header
        temaEscuro={temaEscuro}
        aoAlternarTema={() => setTemaEscuro((atual) => !atual)}
        totalCarrinho={totalItens}
        totalFavoritos={totalFavoritos}
      />

      <main className="container" style={{ paddingTop: 32, paddingBottom: 64 }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                {...produtosState}
                aoAdicionarAoCarrinho={adicionarAoCarrinho}
                aoFavoritar={produtosState.toggleFavorito}
              />
            }
          />
          <Route
            path="/produtos"
            element={
              <Products
                {...produtosState}
                aoAdicionarAoCarrinho={adicionarAoCarrinho}
                aoFavoritar={produtosState.toggleFavorito}
                totalItensCarrinho={totalItens}
                totalValorCarrinho={totalValor}
              />
            }
          />
          <Route
            path="/produtos/:id"
            element={
              <ProductDetails
                produtos={produtosState.products}
                loading={produtosState.loading}
                aoAdicionarAoCarrinho={adicionarAoCarrinho}
                aoFavoritar={produtosState.toggleFavorito}
              />
            }
          />
          <Route path="/sobre" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
