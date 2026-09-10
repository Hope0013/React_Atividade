import "./Filters.css";

// Categorias fixas, na mesma ordem em que aparecem no seletor
const CATEGORIAS = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "eletronicos", rotulo: "Eletrônicos" },
  { valor: "roupas", rotulo: "Roupas" },
  { valor: "acessorios", rotulo: "Acessórios" },
  { valor: "casa", rotulo: "Casa" }
];

// Componente controlado: todo o estado (busca, categoria, ordenação)
// vive no componente pai e é passado para cá via props
function Filters({ busca, aoMudarBusca, categoria, aoMudarCategoria, ordenacao, aoMudarOrdenacao }) {
  return (
    <div className="filtros">
      <div className="filtros-campo">
        <label htmlFor="busca-produto">Buscar produto</label>
        <input
          id="busca-produto"
          type="search"
          placeholder="Digite o nome do produto"
          value={busca}
          onChange={(evento) => aoMudarBusca(evento.target.value)}
        />
      </div>

      <div className="filtros-campo">
        <label htmlFor="filtro-categoria">Categoria</label>
        <select
          id="filtro-categoria"
          value={categoria}
          onChange={(evento) => aoMudarCategoria(evento.target.value)}
        >
          {CATEGORIAS.map((item) => (
            <option key={item.valor} value={item.valor}>
              {item.rotulo}
            </option>
          ))}
        </select>
      </div>

      <div className="filtros-campo">
        <label htmlFor="filtro-ordenacao">Ordenar por</label>
        <select
          id="filtro-ordenacao"
          value={ordenacao}
          onChange={(evento) => aoMudarOrdenacao(evento.target.value)}
        >
          <option value="nome">Nome</option>
          <option value="preco-menor">Menor preço</option>
          <option value="preco-maior">Maior preço</option>
          <option value="categoria">Categoria</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
export { CATEGORIAS };
