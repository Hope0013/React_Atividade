import { useEffect, useState } from "react";
import "./ProductForm.css";

// Estado inicial de um formulário vazio
const FORMULARIO_VAZIO = {
  nome: "",
  preco: "",
  categoria: "eletronicos",
  descricao: "",
  imagem: ""
};

// Formulário controlado: cada campo é armazenado no estado "dados"
// e o valor do input sempre reflete esse estado (por isso "controlado")
function ProductForm({ produtoEmEdicao, aoSalvar, aoCancelarEdicao }) {
  const [dados, setDados] = useState(FORMULARIO_VAZIO);
  const [erros, setErros] = useState({});

  // Quando o usuário clica em "Editar" em algum produto, preenchemos
  // o formulário com os dados desse produto
  useEffect(() => {
    if (produtoEmEdicao) {
      setDados({
        nome: produtoEmEdicao.nome,
        preco: produtoEmEdicao.preco,
        categoria: produtoEmEdicao.categoria,
        descricao: produtoEmEdicao.descricao || "",
        imagem: produtoEmEdicao.imagem || ""
      });
    }
  }, [produtoEmEdicao]);

  // Atualiza um campo específico do formulário, mantendo os outros como estão
  function atualizarCampo(campo, valor) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
  }

  // Confere se os campos obrigatórios estão preenchidos corretamente
  function validar() {
    const novosErros = {};

    if (!dados.nome.trim()) {
      novosErros.nome = "Informe o nome do produto";
    }

    if (!dados.preco || Number(dados.preco) <= 0) {
      novosErros.preco = "Informe um preço válido, maior que zero";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function limparFormulario() {
    setDados(FORMULARIO_VAZIO);
    setErros({});
    if (produtoEmEdicao) {
      aoCancelarEdicao();
    }
  }

  function aoEnviar(evento) {
    evento.preventDefault();

    if (!validar()) {
      return;
    }

    aoSalvar({
      ...dados,
      preco: Number(dados.preco),
      imagem: dados.imagem || "https://picsum.photos/400/300"
    });

    limparFormulario();
  }

  return (
    <form className="formulario-produto" onSubmit={aoEnviar} noValidate>
      <h2>{produtoEmEdicao ? "Editar produto" : "Cadastrar novo produto"}</h2>

      <div className="formulario-campo">
        <label htmlFor="campo-nome">Nome do produto</label>
        <input
          id="campo-nome"
          type="text"
          value={dados.nome}
          onChange={(evento) => atualizarCampo("nome", evento.target.value)}
          aria-invalid={Boolean(erros.nome)}
          aria-describedby={erros.nome ? "erro-nome" : undefined}
        />
        {erros.nome && (
          <span id="erro-nome" className="formulario-erro">
            {erros.nome}
          </span>
        )}
      </div>

      <div className="formulario-linha">
        <div className="formulario-campo">
          <label htmlFor="campo-preco">Preço (R$)</label>
          <input
            id="campo-preco"
            type="number"
            step="0.01"
            min="0"
            value={dados.preco}
            onChange={(evento) => atualizarCampo("preco", evento.target.value)}
            aria-invalid={Boolean(erros.preco)}
            aria-describedby={erros.preco ? "erro-preco" : undefined}
          />
          {erros.preco && (
            <span id="erro-preco" className="formulario-erro">
              {erros.preco}
            </span>
          )}
        </div>

        <div className="formulario-campo">
          <label htmlFor="campo-categoria">Categoria</label>
          <select
            id="campo-categoria"
            value={dados.categoria}
            onChange={(evento) => atualizarCampo("categoria", evento.target.value)}
          >
            <option value="eletronicos">Eletrônicos</option>
            <option value="roupas">Roupas</option>
            <option value="acessorios">Acessórios</option>
            <option value="casa">Casa</option>
          </select>
        </div>
      </div>

      <div className="formulario-campo">
        <label htmlFor="campo-descricao">Descrição</label>
        <textarea
          id="campo-descricao"
          rows="3"
          value={dados.descricao}
          onChange={(evento) => atualizarCampo("descricao", evento.target.value)}
        />
      </div>

      <div className="formulario-campo">
        <label htmlFor="campo-imagem">URL da imagem (opcional)</label>
        <input
          id="campo-imagem"
          type="text"
          placeholder="https://..."
          value={dados.imagem}
          onChange={(evento) => atualizarCampo("imagem", evento.target.value)}
        />
      </div>

      <div className="formulario-acoes">
        <button type="submit" className="botao-primario">
          {produtoEmEdicao ? "Salvar alterações" : "Cadastrar produto"}
        </button>
        <button type="button" className="botao-secundario" onClick={limparFormulario}>
          Limpar
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
