import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="mensagem-estado">
      <h1 style={{ marginBottom: 8 }}>404</h1>
      <p style={{ marginBottom: 20 }}>Essa página não existe.</p>
      <Link to="/" className="botao-primario">
        Voltar para o início
      </Link>
    </div>
  );
}

export default NotFound;
