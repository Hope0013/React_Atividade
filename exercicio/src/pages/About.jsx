function About() {
  return (
    <div style={{ maxWidth: 640 }}>
      <h1 className="secao-titulo">Sobre a Loja Horizonte</h1>
      <p style={{ marginBottom: 12, color: "var(--cor-texto-suave)" }}>
        A Loja Horizonte é um projeto criado para praticar React: componentes,
        estado, formulários, hooks, rotas e integração com uma API própria.
      </p>
      <p style={{ color: "var(--cor-texto-suave)" }}>
        Os produtos exibidos aqui são fictícios e servem apenas para fins de
        estudo.
      </p>
    </div>
  );
}

export default About;
